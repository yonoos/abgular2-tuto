//var Promise = require("es6-promise").Promise;
var Imap = require("browserbox");
var propertiesReader = require("properties-reader");
var simpleParser = require("mailparser").simpleParser;

var props = propertiesReader(__dirname+"/.properties");

var connexionSimple  = null;
var connexionDossiers = {};
var io = null;

function getDossiersArray(boxes){
	var allFolders = [];
	boxes.forEach(function(item){
		var path = item.path;
		var name = item.name;
		var folder = {
			label : name,
			value : path
		};
		allFolders.push(folder);

		if (item.children && item.children.length > 0) {
			allFolders = allFolders.concat(getDossiersArray(item.children));
		}
	});

	return allFolders; ;
};

function formatNomEmail(users) {
	return users.map(function(user) {
		return user.name ? user.name : user.address
	}).join(", ");
}

var onerror = function(error){
	console.log("authentication failed : "+error);
};

var getConncection = function (sucessCallback, errorCallback){
	var imap = new Imap(props.get("imap.host"),props.get("imap.port"), {
		auth : {
			user : props.get("imap.user"),
			pass : props.get("imap.pwd") 
		},
		useSecureTransport : props.get("imap.secure") 
	});

	imap.onerror = errorCallback;
	imap.onclose = onclose;
	imap.oncert = oncert;
	imap.onauth = sucessCallback;

	imap.connect();

	return imap;
};


var onclose = function(){
	console.log("connexion closed !!");
};

var oncert = function(pemEncodedCertificate) {
	console.log("certificate : "+pemEncodedCertificate);
};

exports.connectionSimple = function (req, res, next){
	if(connexionSimple && connexionSimple.authenticated){
		console.log("already connected as simple");
		req.connectionImap = connexionSimple;
		next();
	} else {
		console.log("new simple connection");
		var connexion = getConncection(function(){
			console.log("new simple connection sucess");
			req.connectionImap = connexion;
			connexionSimple = connexion;
			next();
		}, function (error){
			console.log("new simple connection failed : "+error);
			res.status(503).send("new simple connection failed : "+error);
		});
	}
}

exports.connectionDossier = function (req, res, next){
	var dossierVal = req.params.idDossier;
	var dossierConnection = connexionDossiers[dossierVal]; 

	if(dossierConnection && dossierConnection.authenticated && dossierConnection.selectedMailbox == dossierVal) {
		console.log("already connected to folder "+dossierVal);
		req.connectionImap = connexionDossiers[dossierVal];
		next();
	} else {
		console.log("new connection to folder "+dossierVal);
		var connexion = getConncection( function(){
			console.log("new connection to folder "+dossierVal+" sucess");
			connexion.selectMailbox(dossierVal, {readOnly : true}).then(function(folder){
				req.connectionImap = connexion;
				connexionDossiers[dossierVal] = connexion;
				connexion.mailBox = folder;
				connexion.onupdate = function(type, value){
					console.log(" update of folder "+dossierVal+" : "+type+"  "+value);
					if(type == "exists"){
						folder.exists = value;
						console.log("raising new email event");
						io.emit("newmail", dossierVal);
					} else if( type == "expurge"){
						folder.exists--; 
					}
				};
				next();
			}, function(error){
				res.status(500).send(" get box "+dossierVal+"failed : "+error);
			});
		}, function (error) {
			res.status(500).send(" get box "+dossierVal+"failed : "+error);
		});
	}
}


exports.getDossiers = function(req, res){
	var imap = req.connectionImap;
	imap.listMailboxes().then(function(boxes){
		var folders = getDossiersArray(boxes.children);
		res.send(folders);
	}, function(error){
		res.status(500).send(" get boxes failed : "+error);		
	});
};

exports.getDossier = function(req, res){
	var dossierVal = req.params.idDossier;
	var imap = req.connectionImap;
	var folder = imap.mailBox;
	if(folder.exists == 0){
		res.send({value : dossierVal, emails : []});
	} else {
		var range = (folder.exists-10)+':'+folder.exists;
		imap.listMessages(range, ["uid", "flags","envelope"]).then(function(messages){
			messages = messages.map(function(item){
				return {
					id : item.uid,
					from :  formatNomEmail(item.envelope.from),
					to : formatNomEmail(item.envelope.to),
					subject : item.envelope.subject,
					date : new Date(item.envelope.date)  
				};
			});
			res.send({value : dossierVal, emails : messages});
		}, function(error){
			res.status(500).send(" get emails of box "+dossierVal+" failed : "+error);	
		});
	}
};

exports.getMail = function(req, res){
	var dossierVal = req.params.idDossier;
	var idMail = req.params.idMail;
	var imap = req.connectionImap;
	var folder = imap.mailBox;
	if(folder.exists == 0){
		res.send({value : dossierVal, emails : []});
	} else {
		imap.listMessages(idMail, ["uid", "flags","envelope", "body[]"], { byUid: true }).then(function(messages){
			var msg = messages[0];
			try{
				simpleParser(msg['body[]']).then(function(emailParse) {
					res.send({
						id: msg.uid,
						from: formatNomEmail(msg.envelope.from),
						to: formatNomEmail(msg.envelope.to),
						subject: msg.envelope.subject,
						date: new Date(msg.envelope.date),
						content: emailParse.html   ? emailParse.html   : emailParse.text 
					});
				}, function(reject){
					res.status(500).send('parse error occurred:'+ reject.message);
				});
			}catch(err) {
				 res.status(500).send('parse error occurred:'+ err.message);
			}
		}, function(error){
			res.status(500).send(" get email failed : "+error);	
		});
	}
};

exports.setIo = function(obj){
	io = obj;
};
