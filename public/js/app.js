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
    when('/store', {
      templateUrl: 'partials/index',
      controller: 'storeCtrl'
    }).
    otherwise({
      redirectTo: '/store'
    });

  $locationProvider.html5Mode(true);
});
