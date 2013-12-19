'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/partial1',
      controller: 'mainCtrl'
    }).
    when('/store', {
      templateUrl: 'partials/index',
      controller: 'storeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    }).
    when('/cart', {
        templateUrl: 'partials/cart', 
        controller: 'cartCtrl'
    });

  $locationProvider.html5Mode(true);
});
