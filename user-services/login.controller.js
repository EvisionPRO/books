(function () {
    
    var loginApp = angular.module('LoginCtrl', []);

    loginApp.controller('LoginController', function($location, AuthenticationService, FlashService, $rootScope) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/myaccount');
                    $rootScope.userLogin = true;
                    $rootScope.userAccount = true;

                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    });

})();
