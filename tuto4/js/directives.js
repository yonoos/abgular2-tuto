angular.module("MyDirectives", [])
.directive("mailEdit", function(){
    return {
        restrict: "E",
        template:'<div class="spacer"> \
                <form name="newMailForm"> \
                    <div class="input-group"> \
                        <span class="input-group-addon labelNewMail" >&Agrave;</span> \
                        <input type="text" class="form-control" ng-model="newMail.to" />  \
                    </div> \
                    <div class="input-group"> \
                        <span class="input-group-addon labelNewMail" >Objet</span> \
                        <input type="text" class="form-control" ng-model="newMail.subject" /> \
                    </div> \
                    <div class="spacer"> \
                        <textarea  ui-tinymce="optionsTinyMce" class="contentNewMail" rows="12" ng-model="newMail.content" > </textarea> \
                    </div> \
                </form> \
                <div class="spacer text-center"> \
                    <button ng-click="clickSendMail()" class="btn btn-success" >Envoyer</button>  \
                    <button ng-click="clickResetMail()" class="btn btn-warning" >Reinitialiser</button>  \
                </div>  \
                <div class="spacer"> \
                    <pre>{{newMail | json}}</pre> \
                </div> \
            </div>',
        controller: function($scope){
        
            $scope.optionsTinyMce = {
                language: "fr_FR",
                statusbar: false,
                menubar: false
            };
        
            $scope.newMail = null;
        
            $scope.clickSendMail = function(){
        
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
                $scope.emailSend({ newMail: $scope.newMail });
            };
           
            $scope.clickResetMail = function(){
                $scope.newMail =  {
                    'from': "Rudy",
                    'date': new Date()
                };
                if (tinyMCE.activeEditor) {
					tinyMCE.activeEditor.setContent("");
				}
				$scope.newMailForm.$setPristine();
            };
            $scope.$on("initFormNewMail", function() {
                $scope.clickResetMail();
            });
        },
        scope:{
            emailSend:'&'
        }
    };
})
.directive("mailContent", function(){
    return {
        restrict: "E",
        template:'<div class="spacer"> \
                <div class="well"> \
                    <h1>{{email.subject}}</h1> \
                    <p><label>De :</label> <span>{{email.from}}</span></p> \
                    <p><label>&Agrave; :</label> <span>{{email.to}}</span></p> \
                    <p><label>Date :</label> <span>{{email.date  | date:\'dd-MM-yyyy HH:mm\'}}</span></p> \
                </div> \
                <p ng-bind-html="email.content"></p>  \
            </div>',
        scope:{
            email:'='
        }
    };
})

;