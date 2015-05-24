'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('lkhan')
  .controller('LoginCtrl', function ($scope, $rootScope, $state) {

    $scope.form = {
      pw: ''
    };
    $scope.formError = false;

    $scope.login = function () {
      localforage.getItem('lk-pw', function (err, pw) {
        if ($scope.form.pw === pw) {
          $scope.formError = false;
          $rootScope.loggedIn = true;
          $state.go('admin');
        } else {
          $scope.formError = true;
        }
      });
    };
  });
