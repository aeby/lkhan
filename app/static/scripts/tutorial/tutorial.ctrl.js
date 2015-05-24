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

    $rootScope.bgColor = 'bg-' + tutorial.color;
    $scope.btnClass = 'btn-tc-' + tutorial.color;
    $scope.colorClass = 'tc-' + tutorial.color;

    var progress = $scope.topicProgress[tutorial.slug];
    if (progress && progress === tutorial.total) {
      $rootScope.bgColor = 'bg-yellow';
      $scope.btnClass = 'btn-tc-yellow';
      $scope.colorClass = 'tc-yellow';
    }

    _.each(tutorialContents, function (tc) {
      tc.state = 'open';
      tc.action = tc.type === 'v' ? $translate.instant('VIDEO_WATCH') : $translate.instant('EXERCISE_START');
      tc.href = $state.href(getTCStateName(tc.type), {
        topicSlug: $stateParams.topicSlug,
        tutorialSlug: $stateParams.tutorialSlug,
        tutorialContentId: tc.id
      });
    });

    $scope.tutorialContents = tutorialContents;
    $scope.tutorial = tutorial;

    $rootScope.$on('lk-ex-done', function () {
      console.log('done');
    });

    // load progress if any or set first
    // var tc = tutorialContents[0];
    //$state.go(getTCStateName(tc.type), {tutorialContentId: tc.id});
  })
  .controller('ExerciseCtrl', function ($scope, $log, $rootScope, $stateParams, ContentService, PersusService) {
    var exercises = ContentService.getExercises($stateParams.tutorialContentId);
    $scope.exercise = exercises[0];
    $scope.answerBtn = 'CHECK_ANSWER';
    $rootScope.bgColor = '';
    var next = false;

    $scope.showHint = function () {
      PersusService.showHint();
    };

    $scope.checkAnswer = function () {
      if (next) {
        next = false;
        $scope.answerBtn = 'CHECK_ANSWER';
        var index = exercises.indexOf($scope.exercise);
        if (index >= exercises.length) {
          $rootScope.$broadcast('lk-ex-done');
        } else {
          $scope.exercise = exercises[index + 1];
        }
        $scope.answerState = null;
        return;
      }
      var score = PersusService.scoreInput();
      if (score.correct) {
        next = true;
        $scope.answerState = 'Correct!';
        $scope.answerBtn = 'ANSWER_NEXT';
      } else if (!score.empty) {
        $scope.answerState = 'Incorrect, try again.';
      }
    };
  })
  .controller('VideoCtrl', function ($rootScope, $scope, $log, $stateParams, ContentService) {
    $scope.video = ContentService.getVideo($stateParams.tutorialContentId);
    $scope.showNext = false;
    $rootScope.bgColor = '';
    $scope.videoDone = function () {
      $scope.showNext = true;
    };
  });
