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
        var statusURL = 'http://localhost:3000/status';
        var autoRefresh = true;

        var refresh = function(){
            $scope.powerState.label = 'Refreshing...';
            //$scope.infoMsg = 'Refreshing';
            $http.get(statusURL).
                success(function (data) {
                    if (data) {
                        console.log(data);
                        //var demoData = {powerState: 1, isPresent: false, dishWasherIsRunning: false, dishWasherIsReady: false};

                        $scope.powerState.label = data.powerState ===  2 ? 'Active' : 'Inactive';
                        $scope.powerState.isActive = data.powerState === 2;

                        $scope.isPresent.label = data.isPresent ? 'Home' : 'Away';
                        $scope.isPresent.isActive = data.isPresent;

                        $scope.dishwasherState.off = false;
                        $scope.dishwasherState.ready = false;
                        $scope.dishwasherState.running = false;

                        if (data.dishWasherIsRunning){
                            $scope.dishwasherState.running = true;
                        } else if (data.dishWasherIsReady){
                            $scope.dishwasherState.ready = true;
                        } else {
                            $scope.dishwasherState.off = true;
                        }

                        $scope.errorMsg = '';

                        $scope.infoMsg = '';

                        if (autoRefresh) {
                            $timeout(refresh, 1000);
                        }

                    }
                }).error( function (error){
                    $scope.powerState.label = 'Error: ' + error;
                    $scope.powerState.isActive = false;

                    $scope.isPresent.label = 'Error';
                    $scope.isPresent.isActive = false;

                    $scope.dishwasherState.off = true;
                    $scope.dishwasherState.ready = false;
                    $scope.dishwasherState.running = false;

                    $scope.dishWasherIsRunning.label = 'Error';
                    $scope.dishWasherIsRunning.isActive = false;

                    $scope.dishWasherIsReady.label = 'Error';
                    $scope.dishWasherIsReady.isActive = false;

                    $scope.errorMsg = 'Error connecting to the Sunny Dishwasher. Make sure you have it running and the status reachable at ' + statusURL;

                    $scope.infoMsg = '';

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
        $scope.dishwasherState = {
            off: true,
            ready: false,
            running: false
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
