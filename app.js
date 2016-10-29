(function () {

    var app = angular.module('app', ['ngRoute', 'myRoutes', 'ngCookies',  'HomeCtrl', 'LoginCtrl', 'RegisterCtrl', 'store-products', 'Books']);
        


    app.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });

    app.controller('ReviewController', function(){
        
        this.review = {};
        this.addReview = function(product){
        product.reviews.push(this.review);

        
    this.review = {};
    };
  });

    app.controller('StoreController', function($http, $scope, books){
     /*  
      $scope.findSquare = function () {
      $scope.answer = cart.square($scope.number);
      }
       */ 
        
    $http({method: 'GET', url: 'data/books.json'})
        .success(function(data, status, headers, config) {
            $scope.products = data;
        })
        .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
    });
        
        
        
       // $scope.products = books;
    
                 
    $scope.showDesc = function(product) {
        
        $scope.myBook = [];
        
        product = angular.copy(product);
        $scope.myBook.push(product);
                
    }; 
      
        
         
         
    }); 

 
    app.run(function($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/home', '/cart', 'checkout', 'myaccount']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/');
        }
    });
});
 

})();