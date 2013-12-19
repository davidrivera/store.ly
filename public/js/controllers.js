'use strict';

var items = {}; 
var total = 0; 
var cart; 
/* Controllers */

angular.module('myApp.controllers', []).
    
    controller('AppCtrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: '/api/name'
        }).success(function (data, status, headers, config) {
            $scope.name = data.name;
        }).error(function (data, status, headers, config) {
            $scope.name = 'Error!'
        });
    }).
    controller('mainCtrl', function ($scope, $rootScope) {

        $scope.main = 'block'; 

        $scope.changeView = function(){
            $scope.main = 'none'; 
            $rootScope.$emit('showViews');   
        } 
        $scope.showMain = function(){
            return $scope.main; 
        }

    }).
    controller('cartCtrl', function($scope, $rootScope){
       $scope.totalling = 'totalling'; 
        
        //sidebar stuff
        $scope.sidebar = 'none';  
        $scope.hideSidebar = function(){
            $scope.sidebar = 'none'; 
        }
        $scope.showSidebar = function(){
            $scope.sidebar = 'block'
        }
        $scope._sidebar = function(){
            return $scope.sidebar; 
        }
        $scope.injectClass = function(){
            if($scope.sidebar == 'none')
                return "";
            else
                return 'scrolls';
        }

        //root node stuff
        $scope.store = 'none'; 
        $scope.showStore = function(){
            return $scope.store; 
        }
        $rootScope.$on('showViews', function(){
            $scope.store = 'block'; 
        });

        $rootScope.$on('addToCart', function(ev, item){
            if('undefined' === typeof items[item.ItemAttributes.Title]){
                items[item.ItemAttributes.Title] = {quant: 1, val:item};
                total += 20; //should change this to item.price 
            }else{
                items[item.ItemAttributes.Title].quant += 1; 
            } 
        }); 
        $rootScope.removeFromCart = function(item){
             if('undefined' === typeof items[item.val.ItemAttributes.Title]){
                // do nothing!
            }else{
                delete(items[item.val.ItemAttributes.Title]); 
                total -= 20 //should change this to item.price
            }   
        };
        
        $scope.items = items; 
    
        $scope.total = function(){
            return total; 
        };
    
        $scope.numItems = function(){
            return size(items); 
        }
    }).
    controller('storeCtrl', function ($scope, $http, $rootScope) {
        // write Ctrl here

        $http({
            method: 'GET',
            url: '/api/products'
        }).success(function(data) {
            genRows(data.products,function(p){
                $scope.products = p;
            });
            
        });
 
        //root node stuff
        $scope.store = 'none'; 
        $scope.showStore = function(){
            return $scope.store; 
        }
        $rootScope.$on('showViews', function(){
            $scope.store = 'block'; 
        });

        $scope.addToCart = function(item){
            $rootScope.$emit('addToCart', item);   
        }
        $scope.show = function(p){
            p.display = 'block'; 
        }
    
        $scope.hide = function(p){
            p.display = 'none'
        }
        
        $scope.display = function(p){
            return p.display; 
        }; 

    });

//helpers
function size(obj) {
    var size = 0,  key; 
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++; 
    }
    return size; 
}
function genRows(list, fn){
    var set = [];
    var rval = [];
    list.shift();
    list.shift();
    list.shift();
    list.pop();
    list.pop();
    list.pop();
    
    for(var i=0; i < list.length; i++){
       var li = list[i];
       if( i % 3  == 0 && i != 0){
          rval.push(set);
          set = [];
       }
       set.push(li);
    }
    fn(rval);
}
