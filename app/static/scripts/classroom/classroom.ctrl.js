'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:ClassRoomCtrl
 * @description
 * # ClassRoomCtrl
 * Controller of the lkhan
 */
angular.module('lkhan')
  .controller('ClassRoomCtrl', function ($rootScope, $scope, $state, $translate, ContentService, Student) {
    $rootScope.bgColor = '';

    if ($rootScope.currentStudent) {
      $scope.toc = ContentService.getTOC();
      $scope.tutorialProgress = Student.getTutorialProgress($rootScope.currentStudent.id);
    }

    $scope.getTutorialProgress = function (tutorialSlug) {
      return tutorialSlug in $scope.tutorialProgress ? $scope.tutorialProgress[tutorialSlug].length : 0;
    };

    $scope.getTutorialClass = function (tutorial) {
      if (tutorial.slug in $scope.tutorialProgress) {
        if ($scope.tutorialProgress[tutorial.slug].length === tutorial.total) {
          return 'bg-yellow';
        } else {
          return 'bg-' + tutorial.color;
        }
      }
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
