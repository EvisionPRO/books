(function() {
    
var app = angular.module('myRoutes', []);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '/pages/home.htm',
            controller: 'StoreController',
            //controllerAs: 'store'

        })

        .when('/cart', {
            templateUrl: '/pages/cart.htm',
            controller: 'cartController'
        })

        .when('/checkout', {
            templateUrl: '/pages/checkout.htm',
            controller: 'checkoutController'
        })


        .when('/myaccount', {
            controller: 'HomeController',
            templateUrl: 'home/home.view.html',
            controllerAs: 'vm'
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login/login.view.html',
            controllerAs: 'vm'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'register/register.view.html',
            controllerAs: 'vm'
        })

        .otherwise({ redirectTo: '/' });
});

})();