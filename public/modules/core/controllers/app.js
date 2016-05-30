'use strict';

angular.module('dmsApp', ['ngRoute','donorController','eventsController','viewDonorController'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/createDonor', {
                templateUrl: 'modules/donors/views/CreateDonor.html',
                controller: 'donorController'
            })
            .when('/viewDonors', {
                templateUrl: 'modules/donors/views/ViewDonors.html',
                controller: 'donorController'
            })
            .when('/viewDonor/:id', {
                templateUrl: 'modules/donors/views/ViewDonor.html',
                controller: 'viewDonorController'
            })
            .when('/viewEvents', {
                templateUrl: 'modules/events/views/ViewEvents.html',
                controller: 'eventsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
