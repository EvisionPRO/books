(function() {
      

var app = angular.module('myBooksCheckout', []);
    
    
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


app.service('myBooksCheckout.paypal', function($http, books){


});

    
    
    
    
    
    

})();