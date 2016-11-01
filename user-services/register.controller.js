/*************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      Resources and credits: Tutorial Points, Stackoverflow.com, Angularjs.org
**      File name: register.controller.js

**      Desription: this file defines regitration controller

*************************************************************/

(function () {
    
    var registerApp = angular.module('RegisterCtrl', []);

    registerApp.controller('RegisterController', function(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    });

})();
