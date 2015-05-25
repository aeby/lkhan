'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:TutorialCtrl
 * @description
 * # TutorialCtrl
 * Controller of the lkhan
 */
angular.module('lkhan')
  .controller('TutorialCtrl', function ($rootScope, $scope, $log, $state, $stateParams, $translate, ContentService) {
    var tutorial = ContentService.getTutorial($stateParams.topicSlug, $stateParams.tutorialSlug),
      tutorialContents = ContentService.getTutorialContents($stateParams.topicSlug, $stateParams.tutorialSlug);

    function getTCStateName(type) {
      return type === 'v' ? 'khan.video' : 'khan.exercise';
    }

    $scope.topicProgress = {
      'cc-early-math-counting': 3,
      'cc-early-math-numbers-120': 2,
      'cc-early-math-count-object-topic': 1,
      'cc-early-math-together-apart': 1,
    };


    var color = tutorial.color;

    var progress = $scope.topicProgress[tutorial.slug];
    if (progress && progress === tutorial.total) {
      color = 'yellow';
    }

    $rootScope.bgColor = 'bg-' + color;
    $scope.btnClass = 'btn-tc-' + color;
    $scope.colorClass = 'tc-' + color;

    _.each(tutorialContents, function (tc) {
      tc.action = tc.type === 'v' ? $translate.instant('VIDEO_WATCH') : $translate.instant('EXERCISE_START');
      tc.href = $state.href(getTCStateName(tc.type), {
        topicSlug: $stateParams.topicSlug,
        tutorialSlug: $stateParams.tutorialSlug,
        tutorialContentId: tc.id
      });
    });

    $scope.tutorialContents = tutorialContents;
    $scope.tutorial = tutorial;
  });
