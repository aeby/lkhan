'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:TutorialCtrl
 * @description
 * # TutorialCtrl
 * Controller of the lkhan
 */
angular.module('lkhan')
  .controller('TutorialCtrl', function ($rootScope, $scope, $log, $state, $stateParams, $translate, ContentService, Student) {
    if (!$rootScope.currentStudent) {
      $state.go('khan.classroom');
      return;
    }

    var tutorial = ContentService.getTutorial($stateParams.topicSlug, $stateParams.tutorialSlug),
      tutorialContents = ContentService.getTutorialContents($stateParams.topicSlug, $stateParams.tutorialSlug);

    function getTCStateName(type) {
      return type === 'v' ? 'khan.video' : 'khan.exercise';
    }

    _.each(tutorialContents, function (tc) {
      tc.action = tc.type === 'v' ? $translate.instant('VIDEO_WATCH') : $translate.instant('EXERCISE_START');
      tc.href = $state.href(getTCStateName(tc.type), {
        topicSlug: $stateParams.topicSlug,
        tutorialSlug: $stateParams.tutorialSlug,
        tutorialContentId: tc.id
      });
    });

    $scope.exercisesDone = Student.getCompletedExercises($stateParams.tutorialSlug);
    $scope.tutorialContents = tutorialContents;

    var color = tutorial.color;

    if ($scope.exercisesDone && $scope.exercisesDone.length === tutorial.total) {
      color = 'yellow';
    }

    $rootScope.bgColor = 'bg-' + color;
    $scope.btnClass = 'btn-tc-' + color;
    $scope.colorClass = 'tc-' + color;


    $scope.tutorial = tutorial;
  });
