(function() {
    
var app = angular.module('myRoutes', []);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '/pages/home.htm',
            //controller: 'StoreController',
            //controllerAs: 'store'

        })

        .when('/cart', {
            templateUrl: '/pages/cart.htm',
            controller: 'StoreController',

        })

        .when('/checkout', {
            templateUrl: '/pages/checkout.htm',
            controller: 'StoreController'
        })


        .when('/myaccount', {
            controller: 'HomeController',
            templateUrl: '/pages/myaccount.htm',
            controllerAs: 'vm'
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: '/pages/login.htm',
            controllerAs: 'vm'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: '/pages/register.htm',
            controllerAs: 'vm'
        })

        .otherwise({ redirectTo: '/' });
});

})();