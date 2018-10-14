 angular.module("MailServiceHttp", [])
.factory("mailService", function($http) {

	var API_URL = "/api";

	var errorHandler = function(url){
		return function(error){
			alert("error "+url+" :" +error.data );
		}

	};

	var responseHandler = function(obj){
		return function(res){
			angular.extend(obj, res.data);
		};
	};

	return {
		getDossiers: function() {
			var dossiers = [];
			$http.get(API_URL+"/dossiers").then(responseHandler(dossiers), errorHandler("dossiers"));
			return dossiers;
		},
		getDossier: function(valDossier) {
			var dossier = {};
			$http.get(API_URL+"/dossiers/"+valDossier).then( responseHandler(dossier), errorHandler("dossier"));
			return dossier;
		},
		getMail: function(valDossier, idMail) {
			var email = {};
			$http.get(API_URL+"/dossiers/"+valDossier+"/"+idMail).then(responseHandler(email), errorHandler("email"));
			return email;
		},
		envoiMail: function(mail) {
			$http.post(API_URL+"/envoie", mail).then(function(res){}, errorHandler("send"));
		}
	}
})