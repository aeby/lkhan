'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('lkhan')
  .controller('AdminCtrl', function ($window, $scope, $rootScope, $translate, Student, Activity) {

    Student.bindAll($scope, 'students', {active: true});

    function defaultUser() {
      return {name: '', active: true};
    }

    $scope.newStudent = defaultUser();

    $rootScope.$watch('currentStudent', function (student) {
      if (student) {
        Activity.findAll({
          studentId: student.id
        }).then(function (activities) {
          $scope.activities = activities;
        });
      }
    });

    $scope.actionText = function (action) {
      if (action === Activity.ACTION_EXERCISE_DONE) {
        return 'Exercise done';
      }
      if (action === Activity.ACTION_CORRECT) {
        return 'Correct answer';
      }
      if (action === Activity.ACTION_WRONG) {
        return 'Wrong answer';
      }
      if (action === Activity.ACTION_HINT) {
        return 'Hint';
      }
    };

    $scope.addStudent = function () {
      Student.createValidated($scope.newStudent)
        .then(function () {
          $scope.newStudent = defaultUser();
          $scope.userError = null;
        }, function (err) {
          $scope.userError = err;
        });
    };

    $scope.switchStudent = function (studentId) {
      Student.load(studentId);
    };

    $scope.removeStudent = function (studentId) {
      if ($window.confirm($translate.instant('ADMIN_USER_DELETE'))) {
        Student.remove(studentId);
      }
    };

    $scope.languages = ['en', 'es'];
    $scope.currentLanguage = $translate.proposedLanguage() || $translate.use();

    $scope.changeLanguage = function (code) {
      $translate.use(code);
      $scope.currentLanguage = code;
    };

    $scope.pwForm = {
      pw: ''
    };
    $scope.pwError = null;
    $scope.pwSuccess = null;

    $scope.updatePassword = function () {
      if ($scope.pwForm.pw && $scope.pwForm.pw.length > 3) {
        localforage.setItem('lk-pw', $scope.pwForm.pw);
        $scope.pwError = null;
        $scope.pwSuccess = $translate.instant('ADMIN_PASSWORD_UPDATE_OK');
      } else {
        $scope.pwError = $translate.instant('ADMIN_PASSWORD_UPDATE_FAIL');
        $scope.pwSuccess = null;
      }
    };
  });
