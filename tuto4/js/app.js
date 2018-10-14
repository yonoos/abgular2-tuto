angular.module("MyWebmail", ["ngSanitize", "ui.tinymce", "MyFilters", "MyServicesMock", "MyDirectives"])
.controller("MyController", function($scope, $location, mailService){
           
	$scope.currentView = null;
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
    $scope.sendMail = function(mailToSend){
        mailService.sendMail(mailToSend);
        $location.path("/");
    };
    
    $scope.selectDossier = function(dossierVal){
        $scope.dossierCourant = mailService.getDossier(dossierVal);
        if($scope.dossierCourant){
            $scope.currentView = "dossier";
        }
        $scope.emailSelectionne = null;
    };
    
    $scope.selectMail = function(dossierVal, mailId){
        $scope.currentView = "mail";
        $scope.dossierCourant = mailService.getDossier(dossierVal);
        $scope.emailSelectionne = mailService.getMail(dossierVal, mailId);
    }
    
    $scope.$watch(function(){
        return $location.path();
    }, function(newPath) {
        var splitPath = newPath.split("/");
        if(splitPath.length > 1 ){
            var folderId = splitPath[1];
            if(folderId == "newMail"){
                $scope.currentView = "newMail";
                $scope.$broadcast("initFormNewMail");
            } else {
                $scope.selectDossier(folderId);
            }
        }
        if(splitPath.length > 2 ){
            var dossierVal = splitPath[1];
            var emailId = splitPath[2];
            $scope.selectMail(dossierVal, emailId);
        }
    }
    );
    
    $scope.dossiers = mailService.getDossiers();
    
})
;