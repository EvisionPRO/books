(function(){
  var productApp = angular.module('store-products', []);

  productApp.directive('productTitle', function(){
    return {
      restrict: 'AE',
      templateUrl: 'product/title.htm'
    };
  });

  productApp.directive('productDesc', function() {
    return {
      restrict: 'AE',
      templateUrl: 'product/description.htm'
    };
  });

  productApp.directive('productReviews', function(){
    return {
      restrict: "AE",
      templateUrl: 'product/reviews.htm',
        controller: 'ReviewController',

    };
  });

  productApp.directive('productGallery', function(){
    return {
      restrict: 'E',
      templateUrl: 'product/gallery.htm',
      controller: function(){
        this.current = 0;
        this.setCurrent = function(newGallery){
          this.current = newGallery || 0;
        };
      },
      controllerAs: 'gallery'
    };
  });


  productApp.directive('productPanel', function(){
    return {
      restrict: 'E',
      templateUrl: 'product/panel.htm',
      controller: function(){
        this.tab = 1;

        this.setTab = function(newValue){
          this.tab = newValue;
        };

        this.isSet = function(tabName){
          return this.tab === tabName;
        };
      },
      controllerAs: 'tab'
    };
  });
    
    productApp.directive('userLogin', function(){
    return {
        restrict: 'E',
        templateUrl: 'product/login-header.htm',
        controller: 'HomeController',
    };
  });
    

})();
