/*************************************************************

**      LaunchCode Mentorship Program

**      Date: October 2016
**      Author: Jaroslaw Sliz
**      File name: cart-service.js
**      Resources and credits: Stackoverflow.com, www.airpair.com, Github.com/snapjay/ngcart, Angularjs.org

**      Desription: this file contains all functions and services for the cart.

*************************************************************/
(function() {

// Create main app for cart services
var app = angular.module('books', ['books.directives'])

    // Initiate config function
    app.config(function () {
    });

    // Initiate provider service
    app.provider('$books', function () {
        this.$get = function () {
        };
    });

    // Initiate our services in store
    app.run(function ($rootScope, books, booksItem, store) {

        $rootScope.$on('books:change', function(){
            books.$save();
        });

        if (angular.isObject(store.get('cart'))) {
            books.$restore(store.get('cart'));

        } else {
            books.init();
        }

    });

    // Define all functions in bookstore
    app.service('books', function ($rootScope, $window, booksItem, store) {
        
        
        this.init = function(){
            this.$cart = {
                shipping : null,
                items : []
            };
        };

        this.addItem = function (id, name, price, quantity, data) {

            var inCart = this.getItemById(id);

            if (typeof inCart === 'object'){
                //Update quantity of an item if it's already in the cart
                inCart.setQuantity(quantity, false);
                $rootScope.$broadcast('books:itemUpdated', inCart);
            } else {
                var newItem = new booksItem(id, name, price, quantity, data);
                this.$cart.items.push(newItem);
                $rootScope.$broadcast('books:itemAdded', newItem);
            }

            $rootScope.$broadcast('books:change', {});
        };

        this.getItemById = function (itemId) {
            var items = this.getCart().items;
            var build = false;

            angular.forEach(items, function (item) {
                if  (item.getId() === itemId) {
                    build = item;
                }
            });
            return build;
        };

        this.setShipping = function(shipping){
            this.$cart.shipping = shipping;
            return this.getShipping();
        };

        this.getShipping = function(){
            if (this.getCart().items.length == 0) return 0;
            return  this.getCart().shipping;
        };


        this.setCart = function (cart) {
            this.$cart = cart;
            return this.getCart();
        };

        this.getCart = function(){
            return this.$cart;
        };

        this.getItems = function(){
            return this.getCart().items;
        };

        this.getTotalItems = function () {
            var count = 0;
            var items = this.getItems();
            angular.forEach(items, function (item) {
                count += item.getQuantity();
            });
            return count;
        };

        this.getTotalUniqueItems = function () {
            return this.getCart().items.length;
        };

        this.getSubTotal = function(){
            var total = 0;
            angular.forEach(this.getCart().items, function (item) {
                total += item.getTotal();
            });
            return +parseFloat(total).toFixed(2);
        };

        this.totalCost = function () {
            return +parseFloat(this.getSubTotal() + this.getShipping());
        };

        this.removeItem = function (index) {
            var item = this.$cart.items.splice(index, 1)[0] || {};
            $rootScope.$broadcast('books:itemRemoved', item);
            $rootScope.$broadcast('books:change', {});

        };

        this.removeItemById = function (id) {
            var item;
            var cart = this.getCart();
            angular.forEach(cart.items, function (item, index) {
                if(item.getId() === id) {
                    item = cart.items.splice(index, 1)[0] || {};
                }
            });
            this.setCart(cart);
            $rootScope.$broadcast('books:itemRemoved', item);
            $rootScope.$broadcast('books:change', {});
        };

        this.empty = function () {
            
            $rootScope.$broadcast('books:change', {});
            this.$cart.items = [];
            $window.localStorage.removeItem('cart');
        };
        
        this.isEmpty = function () {
            
            return (this.$cart.items.length > 0 ? false : true);
            
        };

        this.toObject = function() {

            if (this.getItems().length === 0) return false;

            var items = [];
            angular.forEach(this.getItems(), function(item){
                items.push (item.toObject());
            });

            return {
                shipping: this.getShipping(),
                subTotal: this.getSubTotal(),
                totalCost: this.totalCost(),
                items:items
            }
        };


        this.$restore = function(storedCart){
            var _self = this;
            _self.init();
            _self.$cart.shipping = storedCart.shipping;

            angular.forEach(storedCart.items, function (item) {
                _self.$cart.items.push(new booksItem(item._id,  item._name, item._price, item._quantity, item._data));
            });
            this.$save();
        };

        this.$save = function () {
            return store.set('cart', JSON.stringify(this.getCart()));
        }

    });

    // Define factory service for bookstore
    app.factory('booksItem', function ($rootScope, $log) {

        var item = function (id, name, price, quantity, data) {
            this.setId(id);
            this.setName(name);
            this.setPrice(price);
            this.setQuantity(quantity);
            this.setData(data);
        };


        item.prototype.setId = function(id){
            if (id)  this._id = id;
            else {
                $log.error('An ID must be provided');
            }
        };

        item.prototype.getId = function(){
            return this._id;
        };


        item.prototype.setName = function(name){
            if (name)  this._name = name;
            else {
                $log.error('A name must be provided');
            }
        };
        item.prototype.getName = function(){
            return this._name;
        };

        item.prototype.setPrice = function(price){
            var priceFloat = parseFloat(price);
            this._price = (priceFloat);
    
        };
        item.prototype.getPrice = function(){
            return this._price;
        };


        item.prototype.setQuantity = function(quantity, relative){


            var quantityInt = parseInt(quantity);
            if (quantityInt % 1 === 0){
                if (relative === true){
                    this._quantity  += quantityInt;
                } else {
                    this._quantity = quantityInt;
                }
                if (this._quantity < 1) this._quantity = 1;

            } else {
                this._quantity = 1;
                $log.info('Quantity must be an integer and was defaulted to 1');
            }

        };

        item.prototype.getQuantity = function(){
            return this._quantity;
        };

        item.prototype.setData = function(data){
            if (data) this._data = data;
        };

        item.prototype.getData = function(){
            if (this._data) return this._data;
            else $log.info('This item has no data');
        };


        item.prototype.getTotal = function(){
            return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
        };

        item.prototype.toObject = function() {
            return {
                id: this.getId(),
                name: this.getName(),
                price: this.getPrice(),
                quantity: this.getQuantity(),
                data: this.getData(),
                total: this.getTotal()
            }
        };

        return item;

    });

    // Create service for local storage
    app.service('store', function ($window) {

        return {

            get: function (key) {
                if ( $window.localStorage.getItem(key) )  {
                    var cart = angular.fromJson( $window.localStorage.getItem(key) ) ;
                    return JSON.parse(cart);
                }
                return false;

            },


            set: function (key, val) {

                if (val === undefined) {
                    $window.localStorage.removeItem(key);
                } else {
                    $window.localStorage.setItem( key, angular.toJson(val) );
                }
                return $window.localStorage.getItem(key);
            }
        }
    });
    
})();
