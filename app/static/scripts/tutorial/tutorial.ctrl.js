'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TutorialCtrl
 * @description
 * # TutorialCtrl
 * Controller of the clientApp
 */
angular.module('lkhan')
  .controller('TutorialCtrl', function ($scope, $log, $stateParams, ContentService) {
    $scope.tutorialContents = ContentService.getTutorialContents($stateParams.topicSlug, $stateParams.tutorialSlug);
    $scope.video = false;
    $scope.exercise = false;
    $scope.menu = false;

    var tcIndex = _.indexBy($scope.tutorialContents, 'id');
    var currentTC = null;

    $scope.setTC = function (id) {
      currentTC = tcIndex[id];
      if(currentTC.type === 'v'){
        $scope.exercise = null;
        $scope.video = ContentService.getVideo(currentTC.id);
      }else{
        $scope.video = null;
      }
    };

    // load progress if any or set first
    $scope.setTC($scope.tutorialContents[0].id);

  });
