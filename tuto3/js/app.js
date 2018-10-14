angular.module("MyWebmail", ["ngSanitize", "ui.tinymce"])
.controller("MyController", function($scope, $location){
    
    $scope.dossiers = [
		{ value: "RECEPTION", label: 'Boite de réception', emails: [
			{ id: 1, from: "Albator", to: "Rudy", subject: "Je reviens", date: new Date(2014, 2, 20, 15, 30), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id ligula ac sem fringilla mattis. Nullam sodales mi vel semper volutpat. Phasellus lorem leo, luctus a lectus id, posuere aliquet orci. Praesent sit amet ipsum porttitor, tempus odio vel, bibendum mauris. Etiam magna lorem, rhoncus eget euismod ac, lobortis quis." },
			{ id: 2, from: "Capitaine Flam", to: "Rudy", subject: "Bisous de l'espace", date: new Date(2014, 3, 18, 16, 12), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur elementum leo. Curabitur luctus, magna a tempor sodales, orci velit dictum magna, nec pharetra turpis ante vehicula ante. Sed sed libero suscipit, rutrum ligula vel, tempor lorem. Phasellus pulvinar dolor ac velit porttitor pulvinar. Mauris felis quam, consequat at <b>mauris</b>." },
			{ id: 3, from: "Pikachu", to: "Rudy", subject: "Pika pika !", date: new Date(2014, 2, 15, 16, 12), content: "Pika pika ! Chuuuuuu. Pika pika ! Chuuuuuu. Pika pika ! Chuuuuuu. Pika pika ! Pika pika ? Piiiiika Chuuuuuu. Pika pika ! Pikachu. Pika pika pika." },
			{ id: 4, from: "Barbapapa", to: "Rudy", subject: "Hulahup Barbatruc", date: new Date(2014, 2, 15, 14, 15), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur elementum leo. Curabitur luctus, magna a tempor sodales, orci velit dictum magna, nec pharetra turpis ante vehicula ante. Sed sed libero suscipit, rutrum ligula vel, tempor lorem. Phasellus pulvinar dolor ac velit porttitor pulvinar. Mauris felis quam, consequat at <b>mauris</b>." }
		]  }, 
		{ value: "ARCHIVES", label: "Archives", emails: [
			{ id: 5, from: "Candy", to: "Rudy", subject: "Bon anniversaire", date: new Date(2014, 2, 15, 16, 12), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id ligula ac sem fringilla mattis. Nullam sodales mi vel semper volutpat. Phasellus lorem leo, luctus a lectus id, posuere aliquet orci. Praesent sit amet ipsum porttitor, tempus odio vel, bibendum mauris. Etiam magna lorem, rhoncus eget euismod ac, lobortis quis." },
			{ id: 6, from: "Hiro Nakamura", to: "Rudy", subject: "Konichiwa", date: new Date(2014, 2, 18, 16, 12), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur elementum leo. Curabitur luctus, magna a tempor sodales, orci velit dictum magna, nec pharetra turpis ante vehicula ante. Sed sed libero suscipit, rutrum ligula vel, tempor lorem. Phasellus pulvinar dolor ac velit porttitor pulvinar. Mauris felis quam, consequat at <b>mauris</b>." },
			{ id: 7, from: "Asuka Langley Soryu", to: "Rudy", subject: "Ca va chier", date: new Date(2014, 2, 15, 17, 50), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id ligula ac sem fringilla mattis. Nullam sodales mi vel semper volutpat. Phasellus lorem leo, luctus a lectus id, posuere aliquet orci. Praesent sit amet ipsum porttitor, tempus odio vel, bibendum mauris. Etiam magna lorem, rhoncus eget euismod ac, lobortis quis." }
		]  },
		{ value: "ENVOYES", label: "Envoyés", emails: [
			{ id: 8, from: "Rudy", to: "Albator", subject: "Bien la famille ?", date: new Date(2014, 2, 15, 16, 12), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id ligula ac sem fringilla mattis. Nullam sodales mi vel semper volutpat. Phasellus lorem leo, luctus a lectus id, posuere aliquet orci. Praesent sit amet ipsum porttitor, tempus odio vel, bibendum mauris. Etiam magna lorem, rhoncus eget euismod ac, lobortis quis." },
			{ id: 9, from: "Rudy", to: "Capitaine Flam", subject: "Gloubiboulga Night", date: new Date(2014, 2, 18, 16, 12), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur elementum leo. Curabitur luctus, magna a tempor sodales, orci velit dictum magna, nec pharetra turpis ante vehicula ante. Sed sed libero suscipit, rutrum ligula vel, tempor lorem. Phasellus pulvinar dolor ac velit porttitor pulvinar. Mauris felis quam, consequat at <b>mauris</b>." }
		] },
		{ value: "SPAM", label: "Courrier indésirable", emails: [
			{ id: 10, from: "Rue du discount", to: "Rudy", subject: "Envie d'un nouveau frigo ?", date: new Date(2014, 2, 15, 16, 12), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id ligula ac sem fringilla mattis. Nullam sodales mi vel semper volutpat. Phasellus lorem leo, luctus a lectus id, posuere aliquet orci. Praesent sit amet ipsum porttitor, tempus odio vel, bibendum mauris. Etiam magna lorem, rhoncus eget euismod ac, lobortis quis." },
			{ id: 11, from: "Sofinnoga", to: "Rudy", subject: "Besoin d'argent ?", date: new Date(2014, 2, 18, 16, 12), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur elementum leo. Curabitur luctus, magna a tempor sodales, orci velit dictum magna, nec pharetra turpis ante vehicula ante. Sed sed libero suscipit, rutrum ligula vel, tempor lorem. Phasellus pulvinar dolor ac velit porttitor pulvinar. Mauris felis quam, consequat at <b>mauris</b>." }
		] }
	];
    
    $scope.optionsTinyMce = {
		language: "fr_FR",
		statusbar: false,
		menubar: false
	};

	$scope.dossierCourant = null;
	$scope.emailSelectionne = null;
    
    
    $scope.toEmail = function(dossier, email){
       $location.path("/"+dossier.value+"/"+email.id);
    };
    
    // tri
	$scope.champTri = null;
	$scope.triDescendant = false;
    
    $scope.triEmails = function(col){
        if ($scope.champTri == col) {
			$scope.triDescendant = !$scope.triDescendant;
		} else {
			$scope.champTri = col;
			$scope.triDescendant = false;
		}
    };
    
    // recherche
    $scope.cssChevronsTri = function(col){
        return {
            glyphicon: $scope.champTri == col,
			'glyphicon-chevron-up' : $scope.champTri == col && !$scope.triDescendant,
			'glyphicon-chevron-down' : $scope.champTri == col && $scope.triDescendant 
        };
    };
    
    $scope.recherche = null;
    
    $scope.razRecherche = function(){
        $scope.recherche = null;
    };
    
    //new Mail
    $scope.newMail = null;
    $scope.emailId = 12;
    
    $scope.getNewMail = function(){
        return {
            'from': "Rudy",
            'date': new Date()
        };
    };
    
    $scope.sendMail = function(){
        
        var regExpValidEmail = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "gi");

		if (!$scope.newMail.to || !$scope.newMail.to.match(regExpValidEmail)) {
			window.alert("Erreur\n\nMerci de vérifier l'adresse e-mail saisie.");
			return;
		}

		if (!$scope.newMail.subject) {
			if (!window.confirm("Confirmation\n\nÊtes-vous certain de vouloir envoyer un mail sans objet ?")) {
				return;
			}
		}

        
        $scope.dossiers.forEach(function(item){
            if(item.value=="ENVOYES"){
                    $scope.emailId++;
                    $scope.newMail.id=$scope.emailId;
                    item.emails.push($scope.newMail);
                    $scope.dossierCourant = item;
                    $scope.emailSelectionne = null;
                    $scope.newMail=null;
            }
        });
    };
    
    $scope.resetMail = function(){
        $scope.newMail = $scope.getNewMail();
    };
    
    $scope.openNewMail = function(){
        $scope.newMail = $scope.getNewMail();      
    };
    
    $scope.$watch(function(){
        return $location.path();
    }, function(newPath) {
        var splitPath = newPath.split("/");
        if(splitPath.length > 1 ){
            var folderId = splitPath[1];
            if(folderId == "newMail"){
                $scope.dossierCourant = null;
                $scope.emailSelectionne = null;
                $scope.openNewMail();
            } else {
                $scope.dossiers.forEach(function(item){
                    if(item.value==folderId){
                       $scope.dossierCourant = item;
                        $scope.emailSelectionne = null;
                        $scope.newMail = null;
                    }
                });
            }
        }
        if(splitPath.length > 2 ){
            var emailId = splitPath[2];
            $scope.dossierCourant.emails.forEach(function(item){
                if(item.id==emailId){
                    $scope.emailSelectionne = item;
                    $scope.newMail = null;
                }
            });
        }
    }
    );
    
})
.filter("surbrillanceRecherche", function(){
    return function(input, recherche){
        if (recherche) {
			return input.replace(new RegExp("(" + recherche + ")", "gi"), "<span class='surbrillanceRecherche'>$1</span>");
		}
		return input;

    };
})
;