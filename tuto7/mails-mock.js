require('useful-date');
require('useful-date/locale/en-US.js');


var dossiers = [
	{ value: "RECEPTION", label: 'Boite de réception' },
	{ value: "ARCHIVES", label: "Archives" },
	{ value: "ENVOYES", label: "Envoyés" },
	{ value: "SPAM", label: "Courrier indésirable" }
];

var contacts = [ "Sangoku", "Chichi", "Bulma", "Krilin", "Tenchinan", "Yamcha", "Tortue Géniale", "Maître Kaio", "Picollo", "Sangohan", "Végéta", "Freezer", "Dendé", "Trunks", "C-16", "C-17", "C-18", "Cell", "Sangoten", "Videl", "Kaio Shin", "Boo" ];
var objet1 = [ "Salut", "Bonjour", "What's up", "Bien ou bien", "Yo", "Quoi de neuf", "Ca va", "Give me news", "Hello", "Qu'est-ce que tu veux" ];
var objet2 = [ "mon cher", "gros", "ma gueule", "man", "mec", "mon vieux", "bro", "vieille branche", "tocard", "grand galopin", "fumier" ];
var contenuMail = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur elementum leo. Curabitur luctus, magna a tempor sodales, orci velit dictum magna, nec pharetra turpis ante vehicula ante. Sed sed libero suscipit, rutrum ligula vel, tempor lorem. Phasellus pulvinar dolor ac velit porttitor pulvinar. Mauris felis quam, consequat at <b>mauris</b>.";

var idProchainMail = 1;
var emailsParDossier = null;


var rand = function(max){
	return Math.floor(Math.random() * max);
};

var randArray = function(arr){
	return arr[rand(arr.length)];
};

var randDateInLastMonth = function() {
	var date = new Date();
	date.setDate(date.getDate() - rand(30));
	date.setHours(rand(24) - 1);
	date.setMinutes(rand(60) - 1);
	return date;
};

exports.generateMails = function (){
	emailsParDossier = [];
	for (var i in dossiers){
		var dossier  = dossiers[i].value;
		emailsParDossier[dossier] = [];
		var nbMails = rand(10)+1;
		for (var j = 0; j < nbMails; j++) {
			var mail = {
				id : idProchainMail++,
				from : dossier=="ENVOYES" ? "Younes" : randArray(contacts),
				to : dossier=="RECEPTION" ? "Younes" : randArray(contacts),
				subject : randArray(objet1)+" "+randArray(objet2),
				content : contenuMail,
				date : randDateInLastMonth()
			};
			emailsParDossier[dossier].push(mail);

		}
	}
};

exports.getDossiers = function(req, res){
	res.send(dossiers);
};

exports.getDossier = function(req, res){
	var dossierVal = req.params.idDossier;
	var dossier = {
		value : dossierVal,
		emails : emailsParDossier[dossierVal]
	};
	setTimeout(function() {
		res.send(dossier);
	}, 2000);
	
};

exports.getMail = function(req, res){
	var emails = emailsParDossier[req.params.idDossier];
	var mail = {};
	for (var i in emails){
		if(emails[i].id == req.params.idMail){
			mail = emails[i];
		}
	}
	res.send(mail);
};

exports.sendMail = function(req, res){
	console.log(req.body);
	var mail = req.body;
	mail.id = idProchainMail++;
	emailsParDossier["ENVOYES"].push(mail);

	res.send({
		sucess : true,
		email : req.body
	});

};