'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:ExerciseCtrl
 * @description
 * # ExerciseCtrl
 * Controller of the lkhan
 */
angular.module('lkhan')
  .controller('ExerciseCtrl', function ($scope, $rootScope, $stateParams, $state, ContentService, PerseusService, Student, Activity) {
    if (!$rootScope.currentStudent) {
      $state.go('khan.classroom');
      return;
    }

    const EXERCISE_SUCCESS = 5,
      AUDIO_CORRECT = new Audio('static/sound/question-correct.ogg'),
      AUDIO_DONE = new Audio('static/sound/end-of-task.ogg'),
      AVATAR_IMAGES = ['orange-juice-squid', 'marcimus', 'mr-pink', 'purple-pi', 'spunky-sam'];
    var exercises = ContentService.getExercises($stateParams.tutorialContentId),
      exercisesDone = [],
      logAction = false;

    $rootScope.bgColor = '';
    $scope.exercisesRow = [];
    $scope.showResult = false;
    $scope.done = false;

    function addAction(action) {
      if (logAction) {
        Student.setActivity(
          $stateParams.topicSlug,
          $stateParams.tutorialSlug,
          $stateParams.tutorialContentId,
          action
        );
        logAction = false;
        if ($scope.exercisesRow.length === EXERCISE_SUCCESS) {
          $scope.exercisesRow.splice(EXERCISE_SUCCESS - 1, 1);
        }
        $scope.exercisesRow.unshift(action);
      }
    }

    $scope.showHint = function () {
      PerseusService.showHint();
      $scope.hints = $scope.hints - 1;
      addAction(Activity.ACTION_HINT);
    };

    $scope.checkAnswer = function () {
      var score = PerseusService.scoreInput();
      if (!score.empty) {
        $scope.answerCorrect = score.correct;
        if (score.correct) {
          addAction(Activity.ACTION_CORRECT);
          AUDIO_CORRECT.play();
        } else {
          addAction(Activity.ACTION_WRONG);
        }
        $scope.answerWrong = !$scope.answerCorrect;
        $scope.showResult = true;
      }
    };

    $scope.nextAnswer = function () {
      $scope.showResult = false;
      $scope.answerCorrect = false;
      $scope.answerWrong = false;

      // check if there were 5 correct answers in a row
      if (_.filter($scope.exercisesRow, function (v) {
          return v === Activity.ACTION_CORRECT;
        }).length === EXERCISE_SUCCESS) {
        AUDIO_DONE.play();
        $scope.done = true;
        $scope.image = AVATAR_IMAGES[Math.floor(Math.random() * AVATAR_IMAGES.length)];

        Student.setActivity(
          $stateParams.topicSlug,
          $stateParams.tutorialSlug,
          $stateParams.tutorialContentId,
          Activity.ACTION_EXERCISE_DONE
        );

      } else {
        // enable action log
        logAction = true;

        // move exercise to done
        if ($scope.exercise) {
          exercisesDone.push($scope.exercise);
          var index = exercises.indexOf($scope.exercise);
          if (index > -1) {
            exercises.splice(index, 1);
          }
          // swap done exercises if all used
          if (!exercises.length) {
            exercises = exercisesDone;
            exercisesDone = [];
          }
        }
        $scope.exercise = exercises[Math.floor(Math.random() * exercises.length)];
        PerseusService.getNumHints().then(function (data) {
          $scope.hints = data;
        });
      }
    };
    $scope.nextAnswer();
  });
