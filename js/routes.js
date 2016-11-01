/*************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      File name: routes.js
**      Resources and credits: Codeschool.com, Stackoverflow.com, Angularjs.org

**      Desription: this file defines all relations between pages in the store including navigation among each other.
 
*************************************************************/

(function() {
 
// Create main app for the module
var app = angular.module('myRoutes', []);

    // Define config service that contains details about all pages
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'books/pages/home.htm',
                //controller: 'StoreController',
                //controllerAs: 'store'

            })

            .when('/cart', {
                templateUrl: 'books/pages/cart.htm',
                controller: 'StoreController',

            })

            .when('/checkout', {
                templateUrl: 'books/pages/checkout.htm',
                controller: 'StoreController'
            })


            .when('/myaccount', {
                controller: 'HomeController',
                templateUrl: 'books/pages/myaccount.htm',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'books/pages/login.htm',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'books/pages/register.htm',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/' });
    });

})();
