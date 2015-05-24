'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('lkhan')
  .controller('AdminCtrl', function ($window, $scope, $rootScope, $translate, DS, Student) {

    Student.bindAll({active: true}, $rootScope, 'students');
    DS.findAll('student');

    function defaultUser() {
      return {name: '', active: true};
    }

    $scope.newStudent = defaultUser();

    $scope.addStudent = function () {
      DS.create('student', $scope.newStudent)
        .then(function () {
          $scope.newStudent = defaultUser();
          $scope.userError = null;
        }, function (err) {
          $scope.userError = err;
        });
    };

    $scope.switchStudent = function (id) {
      $rootScope.currentStudent = Student.get(id);
    };

    $scope.removeStudent = function (id) {
      if ($window.confirm($translate.instant('ADMIN_USER_DELETE'))) {
        var st = Student.get(id);
        st.active = false;
        st.name = st.name + '_deactivated_' + Date.now();
        Student.save(id).then(function () {
        }, function (err) {
          console.error(err);
        });
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
