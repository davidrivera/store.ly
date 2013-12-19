'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).
    directive('cart', function(){
        return{
            restrict: 'E', 
            scope:{'items':'=data'}, 
    template: "<ul class='nav nav-pills nav-stacked'><li ng-repeat='item in items'>\n" +
    "  {{item.name}} 20</li>" +
    "</ul>"
        }
    });
