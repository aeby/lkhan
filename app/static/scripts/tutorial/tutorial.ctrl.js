'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:TutorialCtrl
 * @description
 * # TutorialCtrl
 * Controller of the lkhan
 */
angular.module('lkhan')
  .controller('TutorialCtrl', function ($scope, $log, $state, $stateParams, $rootScope, ContentService) {
    var tutorialContents = ContentService.getTutorialContents($stateParams.topicSlug, $stateParams.tutorialSlug),
      menuItems = [];

    function getTCStateName(type) {
      return type === 'v' ? 'khan.tutorials.video' : 'khan.tutorials.exercise';
    }

    _.each(tutorialContents, function (tc) {
      menuItems.push({
        href: $state.href(getTCStateName(tc.type), {tutorialContentId: tc.id}),
        label: tc.title,
        type: tc.type
      });
    });

    $scope.menuItems = menuItems;

    $rootScope.$on('lk-ex-done', function(){
      console.log('done');
    });

    // load progress if any or set first
    var tc = tutorialContents[0];
    $state.go(getTCStateName(tc.type), {tutorialContentId: tc.id});
  })
  .controller('ExerciseCtrl', function ($scope, $log, $rootScope, $stateParams, ContentService, PersusService) {
    var exercises = ContentService.getExercises($stateParams.tutorialContentId);
    $scope.exercise = exercises[0];
    $scope.answerBtn = 'CHECK_ANSWER';
    var next = false;

    $scope.showHint = function () {
      PersusService.showHint();
    };

    $scope.checkAnswer = function () {
      if(next){
        next = false;
        $scope.answerBtn = 'CHECK_ANSWER';
        var index = exercises.indexOf($scope.exercise);
        if(index >= exercises.length){
          $rootScope.$broadcast('lk-ex-done');
        }else {
          $scope.exercise = exercises[index+1];
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
  .controller('VideoCtrl', function ($scope, $log, $stateParams, ContentService) {
    $scope.video = ContentService.getVideo($stateParams.tutorialContentId);
    $scope.showNext = false;
    $scope.videoDone = function () {
      $scope.showNext = true;
    };
  });
