(function () {

    var app = angular.module('app', ['ngRoute', 'ngCookies',  'HomeCtrl', 'LoginCtrl', 'RegisterCtrl', 'store-products']);

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            
            .when('/', {
                templateUrl: '/pages/home.htm',
                controller: 'StoreController'
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

    app.run(function($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
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
    
    
    app.controller('cartController', function() {
        
    /*    
        $scope.cartItems = [];
        
        $scope.addItem = function(newItem) {
            
            
            newItem = angular.copy(newItem);
            $scope.cartItems.push(newItem);
            
            console.log(" kjnsknak dna" + cartItems.lastIndexOf());
        };
        
        $scope.removeItem = function(item) {
            
            
        };
        
        */
        
        
    });
    
    app.controller('checkoutController', function() {
        
        
    });
    
    app.controller('myaccountController', function() {
        
        
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

    app.controller('ReviewController', function(){
    this.review = {};
    this.addReview = function(product){
    product.reviews.push(this.review);
    this.review = {};
    };
  });

    app.controller('StoreController', function($scope){
        
    
  

      //  }
        
     // console.log('here is my id - ' + desc);  
        
//    $scope.myDesc = false;

  //  $scope.chosenBook = [];
    
  var books = [{
      id: 0,
      name: '7 Habits of Highly Effective People',
      description: "One of the most inspiring and impactful books ever written, The 7 Habits of Highly Effective People has captivated readers for 25 years. It has transformed the lives of Presidents and CEOs, educators and parents— in short, millions of people of all ages and occupations.",
      pages: 432,
      price: 10.50,
      language: 'English',
      shipping: '13.6 ounces',
      dimensions: '5.5 x 1 x 8.4 inches',
      images: [
        "images/seven.jpg"
      ],
      reviews: [{
        stars: 5,
        body: "I love this book!",
        author: "joe@example.org",
        createdOn: 1397490980837
      }, {
        stars: 4,
        body: "This great book",
        author: "tim@example.org",
        createdOn: 1397490980837
      }]
    }, {
      id: 1,
      name: 'First 100 Words and pictures - board book',
      description: "Your little one will soon learn some essential first words and pictures with this bright board book. There are 100 color photographs to look at and talk about, and 100 simple first words to read and learn, too. The pages are made from tough board for hours of fun reading, and the cover is softly padded for little hands to hold.",
      pages: 26,
      price: 5.90,
      language: "English",
      shipping: '7.2 ounces',
      dimensions: '4.8 x 1 x 6.2 inches',
      images: [
        "images/first.jpg"
      ],
      reviews: [{
        stars: 3,
        body: "I think this book was just OK.",
        author: "JimmyDean@example.org",
        createdOn: 1397490980837
      }, {
        stars: 5,
        body: "This book is for my kids!",
        author: "gemsRock@example.org",
        createdOn: 1397490980837
      }]
    }, {
      id: 2,
      name: 'The Whole30: The 30-Day Guide',
      description: "Millions of people visit Whole30.com every month and share their stories of weight loss and lifestyle makeovers. Hundreds of thousands of them have read It Starts With Food, which explains the science behind the program. At last, The Whole30 provides the step-by-step, recipe-by-recipe guidebook that will allow millions of people to experience the transformation of their entire life in just one month.",
      pages: 432,
      price: 19,
      language: "English",
      shipping: '2.7 pounds',
      dimensions: '8 x 1.3 x 9 inches',
      images: [
        "images/whole.jpg"
      ],
      reviews: [{
        stars: 1,
        body: "This book is WAY too expensive...",
        author: "turtleguyy@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "I don't like this book :(",
        author: "LouisW407@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "Don't waste your rubles!",
        author: "nat@example.org",
        createdOn: 1397490980837

      }]
    }];
    
       
    this.products = books;
    
                    
    $scope.showDesc = function(product) {
        
        $scope.chosenBook = [];

        
        product = angular.copy(product);
        product.id = new Date().getUTCMilliseconds();
        $scope.chosenBook.push(product);
        
    }; 
        
        
        
        $scope.cartItems = [];
        
        $scope.addItem = function(newItem) {
            
            
            newItem = angular.copy(newItem);
            $scope.cartItems.push(newItem);
            
            console.log(" kjnsknak dna" + $scope.cartItems.lastIndexOf());
        };
        
        $scope.removeItem = function(item) {
            
            
        };
         
    
});
  
    

})();