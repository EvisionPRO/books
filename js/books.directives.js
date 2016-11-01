/*************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      File name: books.directives.js
**      Resources and credits: Codeschool.com, Stackoverflow.com, Angularjs.org


**      Desription: this file contains functions, controllers and directives related to the cart. 

*************************************************************/

(function() {

    
// Create main app for directives
var app = angular.module('books.directives', ['myBooksCheckout']);

    // Create CartCotroller
    app.controller('CartController', function($scope, books) {
        $scope.books = books;
    });

    // Create add to cart button directive
    app.directive('booksAddtocart', function(books){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {
                id:'@',
                name:'@',
                quantity:'@',
                price:'@',
                data:'='
            },
            transclude: true,
            templateUrl: function(element, attrs) {
                if ( typeof attrs.templateUrl == 'undefined' ) {
                    return 'product/addtocart.html';
                 } else {
                    return attrs.templateUrl;
                }
            },
            link:function(scope, element, attrs){
                scope.attrs = attrs;
                scope.inCart = function(){
                    return  books.getItemById(attrs.id);
                };

                if (scope.inCart()){
                    scope.q = books.getItemById(attrs.id).getQuantity();
                } else {
                    scope.q = parseInt(scope.quantity);
                }
            }
        };
    });

    // Create book cart directive 
    app.directive('booksCart', function(){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            templateUrl: function(element, attrs) {
                if ( typeof attrs.templateUrl == 'undefined' ) {
                    return 'product/cart.html';
                } else {
                    return attrs.templateUrl;
                }
            },
            link:function(scope, element, attrs){
            }
        };
    });

    // Create cart summary directive - right corner on the top
    app.directive('booksSummary', function() {
        return { 
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            transclude: true,
            templateUrl: 'product/summary.html'
        };
    });
    
    // Create checkout paypal directive
    app.directive('booksCheckout', function(){
        return {
            restrict : 'E',
            controller : ('CartController', function($rootScope, $scope, books, fulfilmentProvider) {
                $scope.books = books;

                $scope.checkout = function () {
                    fulfilmentProvider.setService($scope.service);
                    fulfilmentProvider.setSettings($scope.settings);
                    fulfilmentProvider.checkout()
                        .success(function (data, status, headers, config) {
                            $rootScope.$broadcast('books:checkout_succeeded', data);
                        })
                        .error(function (data, status, headers, config) {
                            $rootScope.$broadcast('books:checkout_failed', {
                                statusCode: status,
                                error: data
                            });
                        });
                }
            }),
            scope: {
                service:'@',
                settings:'='
            },
            transclude: true,
            templateUrl: function(element, attrs) {
                if ( typeof attrs.templateUrl == 'undefined' ) {
                    return 'product/checkout.html';
                } else {
                    return attrs.templateUrl;
                }
            }
        };
    });


})();