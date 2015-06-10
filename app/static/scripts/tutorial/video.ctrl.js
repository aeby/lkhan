'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:VideoCtrl
 * @description
 * # VideoCtrl
 * Controller of the lkhan
 */
angular.module('lkhan')
  .controller('VideoCtrl', function ($rootScope, $scope, $state, $stateParams, ContentService) {
    if (!$rootScope.currentStudent) {
      $state.go('khan.classroom');
      return;
    }
    $scope.video = ContentService.getVideo($stateParams.tutorialContentId);
    $scope.showNext = false;
    $rootScope.bgColor = '';
    $scope.videoDone = function () {
      $scope.showNext = true;
    };
  });
