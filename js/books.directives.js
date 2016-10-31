(function() {

var app = angular.module('books.directives', ['myBooksCheckout'])

    app.controller('CartController', function($scope, books) {
        $scope.books = books;
    });

    app.directive('booksAddtocart', function(books){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {
                id:'@',
                name:'@',
                quantity:'@',
                quantityMax:'@',
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

    app.directive('booksSummary', function() {
        return { 
            restrict : 'E',
            controller : 'CartController',
            scope: {},
            transclude: true,
            templateUrl: 'product/summary.html'
        };
    });
    
    
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