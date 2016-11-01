/*************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      File name: chackout.js
**      Resources and credits: Stackoverflow.com, www.airpair.com, Github.com/snapjay/ngcart, Angularjs.org

**      Desription: this file contains all functions and services for the checkout process.

*************************************************************/

(function() {
      
// Create module for checkout services
var app = angular.module('myBooksCheckout', []);
    
    // Create services for paypal checkout
    app.service('fulfilmentProvider', function($injector){

        this._obj = {
            service : undefined,
            settings : undefined
        };

        this.setService = function(service){
            this._obj.service = service;
        };

        this.setSettings = function(settings){
            this._obj.settings = settings;
        };

        this.checkout = function(){
            var provider = $injector.get('myBooksCheckout.' + this._obj.service);
              return provider.checkout(this._obj.settings);
        };
    });

    app.service('myBooksCheckout.log', function($q, $log, books){

            this.checkout = function(){

                var deferred = $q.defer();

                $log.info(books.toObject());
                deferred.resolve({
                    cart:books.toObject()
                });

                return deferred.promise;
            };
     });

    app.service('myBooksCheckout.http', function($http, books){
            this.checkout = function(settings){
                return $http.post(settings.url,
                    { data: books.toObject(), options: settings.options});
            };
     });    

})();