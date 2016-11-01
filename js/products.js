/*************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      File name: products.js
**      Resources and credits: Codeschool.com, Stackoverflow.com, Angularjs.org

**      Desription: this file contains all directives connected the products displayed in the bookstore.

*************************************************************/

(function(){
    
// Create main app for module
var productApp = angular.module('store-products', []);
    
    // Create product titile directive
    productApp.directive('productTitle', function(){
        return {
          restrict: 'AE',
          templateUrl: 'product/title.htm'
        };
    });

    // Create product description directive
    productApp.directive('productDesc', function() {
        return {
          restrict: 'AE',
          templateUrl: 'product/description.htm'
        };
    });

    // Create product reviews directive
    productApp.directive('productReviews', function(){
        return {
          restrict: "AE",
          templateUrl: 'product/reviews.htm',
            controller: 'ReviewController',
        };
    });

    // Create product gallery directive
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

    // Create product panel directive
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

})();
