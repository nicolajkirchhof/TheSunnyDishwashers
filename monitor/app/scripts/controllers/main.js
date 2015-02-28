'use strict';

/**
 * @ngdoc function
 * @name monitorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monitorApp
 */
angular.module('monitorApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {

        var autoRefresh = false;

        var refresh = function(){
            $scope.powerState.label = 'Refreshing...';
            $http.get('http://localhost:3000/status').
                success(function (data) {
                    if (data) {
                        console.log(data);
                        //var demoData = {powerState: 1, isPresent: false, dishWasherIsRunning: false, dishWasherIsReady: false};

                        $scope.powerState.label = data.powerState ===  1 ? 'Active' : 'Inactive';
                        $scope.powerState.isActive = data.powerState === 1;

                        $scope.isPresent.label = data.isPresent ? 'Home' : 'Away';
                        $scope.isPresent.isActive = data.isPresent;

                        $scope.dishWasherIsRunning.label = data.dishWasherIsRunning ? 'Running' : 'Not running';
                        $scope.dishWasherIsRunning.isActive = data.dishWasherIsRunning;

                        $scope.dishWasherIsReady.label = (data.dishWasherIsReady ? 'Ready' : 'Not ready');
                        $scope.dishWasherIsReady.isActive = data.dishWasherIsReady;

                        if (autoRefresh) {
                            $timeout(refresh, 1000);
                        }

                    }
                }).error( function (error){
                    $scope.powerState.label = 'Error: ' + error;
                    $scope.powerState.isActive = false;

                    $scope.isPresent.label = 'Error';
                    $scope.isPresent.isActive = false;

                    $scope.dishWasherIsRunning.label = 'Error';
                    $scope.dishWasherIsRunning.isActive = false;

                    $scope.dishWasherIsReady.label = 'Error';
                    $scope.dishWasherIsReady.isActive = false;

                    if (autoRefresh) {
                        $timeout(refresh, 1000);
                    }
                });
        };

        $scope.powerState = {
            label : 'Initializing...',
            isActive: false
        };
        $scope.isPresent = {
            label : 'Initializing...',
            isActive: false
        };
        $scope.dishWasherIsReady = {
            label : 'Initializing...',
            isActive: false
        };
        $scope.dishWasherIsRunning = {
            label : 'Initializing...',
            isActive: false
        };

        $scope.refresh = refresh;

        refresh();



  });
