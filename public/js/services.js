'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []). 
  value('version', '0.1'); 
/*  factory('cartWoker',function(){
        var items = {}; 
            
        return {
            addToCart: function(item){
                if('undefined' === typeof items[item.name]){
                    items[item.name] = {quant: 1, val:item}; 
                }else{
                    items[item.name].quant += 1; 
                }
            }, 
            removeFromCart: function(item){
                 if('undefined' === typeof items[item.name]){
                     // do nothing!
                }else{
                    delete(items[item.name]); 
                }
            }
        }
    });*/
