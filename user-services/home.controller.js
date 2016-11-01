/*************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      Resources and credits: Tutorial Points, Stackoverflow.com, Angularjs.org
**      File name: home.controller.js

**      Desription: this file defines a controller used on the page after user login into the system

*************************************************************/

(function(){
  
// Create main app for the module
var homeApp = angular.module('HomeCtrl', []);
    
    // Create controller with all functions
    homeApp.controller('HomeController', function(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        };
        
    });
    
})();

