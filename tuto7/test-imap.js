process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var Imap = require("browserbox");
var propertiesReader = require("properties-reader");

var props = propertiesReader(__dirname+"/.properties");

var imap = new Imap(props.get("imap.host"),props.get("imap.port"), {
	auth : {
		user : props.get("imap.user"),
		pass : props.get("imap.pwd") 
	},
	useSecureTransport : props.get("imap.secure") 
});

function getDossiers(boxes){
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
			allFolders = allFolders.concat(getDossiers(item.children));
		}
	});

	return allFolders; ;
};

imap.onauth = function(){
	console.log("authentication success !!");
	imap.listMailboxes().then(function(boxes){

		var folders = getDossiers(boxes.children);
		console.log(folders);
		return imap.selectMailbox(folders[0].value, {readOnly : true});

	}, function(error){
		console.log(" get boxes failed : "+error);
	}).then(function(folder){

		console.log(folder);
		return imap.listMessages("1:5", ["uid", "flags","body[]", ]);

	}, function(error){
		console.log("select mail box failed : "+error);
	}).then(function(mails){

		console.log(mails);

	}, function(error){
		console.log("list emails failed : "+error);
	});
};

imap.onerror = function(error){
	console.log("authentication failed : "+error);
};


imap.onclose = function(){
	console.log("connexion closed !!");
};

imap.onupdate = function(type, value){
	console.log("update type:"+type +" \nvalue: "+value);
};

imap.oncert = function(pemEncodedCertificate) {
	console.log("certificate : "+pemEncodedCertificate);
};

 imap.connect();