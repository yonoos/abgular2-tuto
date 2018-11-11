 angular.module("MailServiceRest", ["ngResource"])
.factory("mailService", function($resource) {

	var API_URL = "/api";

	var resourceMail = $resource(API_URL+"/dossiers", null,  {
		"getDossiers" : {method:"GET", isArray:true},
		"getDossier" : {method:"GET", isArray:false, url:API_URL+"/dossiers/:idDossier"},
		"getMail" : {methdo:"GET", isArray:false, url:API_URL+"/dossiers/:idDossier/:idMail"},
		"sendMail" : {method:"POST", url:API_URL+"/envoie"}
	});

	
	return {
		getDossiers: function() {
			return resourceMail.getDossiers();
		},
		getDossier: function(valDossier) {
			return resourceMail.getDossier({idDossier:valDossier});
		},
		getMail: function(valDossier, idMail) {
			return resourceMail.getMail({idDossier:valDossier, idMail:idMail});
		},
		envoiMail: function(mail) {
			resourceMail.sendMail(mail, function(){
				alert("Le mail a bien été envoyé !");
			}, function(res){
				alert("Erreur " + res.status + " lors de l'envoi de mail : " + res.data);
			});
		}
	}
})