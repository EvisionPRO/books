/*************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      File name: app.js
**      Resources and credits: Codeschool.com, Stackoverflow.com, Tutorial Points, Angularjs.org

**      Desription: this file contains all of the main functions and controllers in the BookStore. Any other components like directives and other services are connected into that file as well. 

*************************************************************/

(function () {

    // Create main app for BookStore
    var app = angular.module('app', ['ngRoute', 'myRoutes', 'ngCookies',  'HomeCtrl', 'LoginCtrl', 'RegisterCtrl', 'store-products', 'books', 'myBooksCheckout']);
        
     // Define conection with JSON data using $http 
    app.factory('myService', function($http) {
      var myService = {
        async: function() {
          var promise = $http.get('data/books.json').then(function (response) {
            // Checking connection if needed
            //console.log(response);
            return response.data;
          });
          return promise;
        }
      };
      return myService;
    });
    
    
    // Create tab controller for books
    app.controller('TabController', function(){
        this.tab = 1;
        this.setTab = function(newValue){
          this.tab = newValue;
        };
        this.isSet = function(tabName){
          return this.tab === tabName;
        };
    });

    // Create reviews controller
    app.controller('ReviewController', function($scope, myService){        
            
        $scope.review = {};

        $scope.addReview = function(){  
            $scope.reviews.push(this.review);
            $scope.review = {}; 
        };
        
    });

    // Create a main StoreController 
    app.controller('StoreController', function($scope, books, $log,myService){
     
      // Starting connection with our JSON
        myService.async().then(function(data) {
            $scope.products = data;
        });  
        
     // Create function for my description, depends which image/button you will click on, returns correct description            
    $scope.showDesc = function(product) {
        
        $scope.myBook = [];
        
        product = angular.copy(product);
        $scope.myBook.push(product);
        $scope.showMe = true;
    }; 
      
        
    // Connect paypal settings with template
    $scope.httpSettings = {
        url:'/checkout'
    };

    $scope.payPalSettings ={ paypal:{
            business:'evisionpro.llc@gmail.com',
            item_name:'My Books',
            item_number:'item_number',
            currency_code:'USD'
        }};

    // Setup Paypal details for checkout
    $scope.showCart = function(){

        $log.info ('---Total Cost:---');
        $log.info (books.totalCost());
        $log.info ('---Items in Cart:---');
        $log.info (books.getItems());

        }; 
    }); 

     // Services for login and registration pages
    app.run(function($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refreshed
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
        };

    
        // redirect to login page if not logged in and trying to access a restricted page 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/home', '/cart', '/checkout', '/']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            };
        });
    });

})();