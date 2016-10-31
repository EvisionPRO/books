/*****************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      File name: app.js

**      Desription: this file contain all our main functions, controllers in our BookStore. Any other components like directives and other servoces are conected into that file as well. 

******************************************************************/

(function () {

    var app = angular.module('app', ['ngRoute', 'myRoutes', 'ngCookies',  'HomeCtrl', 'LoginCtrl', 'RegisterCtrl', 'store-products', 'books', 'myBooksCheckout']);
        
    
app.factory('myService', function($http) {
  var myService = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('data/books.json').then(function (response) {
        // The then function here is an opportunity to modify the response
        //console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});
    
    

    app.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });

    app.controller('ReviewController', function($scope, myService){
        
    //    this.review = [];
        
           
    myService.async().then(function(data) {
    $scope.products = data;
                
     
        
        });  
    
        
  });

    app.controller('StoreController', function($scope, books, $log,myService){
     
    $scope.list = [];
        
      $scope.submit = function() {
          $scope.list.push(this.text);
        
      };
        
        
        $scope.review = [];
        
      $scope.submit = function() {
          $scope.review.push(this.star, this.body, this.author);
        
      };
        
        
     /*         
         $scope.review = [];

        $scope.addReview = function(){  
            $scope.reviews.push(this.review);
            $scope.review = []; 
        
        };
        
        */
        
    
        
      
      
    myService.async().then(function(data) {
        $scope.products = data;
                
    });  

                 
    
    
                 
    $scope.showDesc = function(product) {
        
        $scope.myBook = [];
        
        product = angular.copy(product);
        $scope.myBook.push(product);
        $scope.showMe = true;
    }; 
      
        
         // Paypal checkout
          $scope.httpSettings = {
            url:'/checkout'
        };

        $scope.payPalSettings ={ paypal:{
            business:'evisionpro.llc@gmail.com',
            item_name:'My Books',
            item_number:'item_number',
            currency_code:'USD'
        }};

    $scope.showCart = function(){

        $log.info ('---Total Cost:---');
        $log.info (books.totalCost());
        $log.info ('---Items in Cart:---');
        $log.info (books.getItems());

    }
        
         
    }); 

 
    app.run(function($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
    }

        
        
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/home', '/cart', '/checkout', '/']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
});
    

 

})();