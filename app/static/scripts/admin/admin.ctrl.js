'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('lkhan')
  .controller('AdminCtrl', function ($scope, $rootScope, $translate, DS, Student) {

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
      var st = Student.get(id);
      st.active = false;
      Student.save(id).then(function (s) {
      }, function (err) {
        console.error(err);
      })
    };

    $scope.languages = ['en', 'es'];
    $scope.changeLanguage = function (code) {
      $translate.use(code);
    };

    $scope.toggleFullScreen = function () {
      if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    };
  });
