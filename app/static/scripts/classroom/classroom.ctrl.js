'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:ClassRoomCtrl
 * @description
 * # ClassRoomCtrl
 * Controller of the lkhan
 */
angular.module('lkhan')
  .controller('ClassRoomCtrl', function ($rootScope, $scope, $log, $translate, ContentService) {
    var topics = ContentService.getTopicStructure(),
      toc = [],
      TOPIC_TITLE_LIMIT = 55;

    $rootScope.bgColor = '';

    $scope.topicProgress = {
      'cc-early-math-counting': 3,
      'cc-early-math-numbers-120': 2,
      'cc-early-math-count-object-topic': 1,
      'cc-early-math-together-apart': 1,
    };

    $scope.getTutorialClass = function (tutorial) {
      var progress = $scope.topicProgress[tutorial.slug];
      if (progress) {
        if (progress === tutorial.total) {
          return 'bg-yellow';
        } else {
          return 'bg-' + tutorial.color;
        }
      }
    };

    // layout
    _.each(topics, function (topic) {

      var currentRow = [], currentRowLength = 0, currentTopic = {
        title: topic.title,
        slug: topic.slug,
        rows: []
      };

      _.each(topic.tutorials, function (tutorial) {
        var titleLength = tutorial.title.length;
        tutorial.progress = 0;
        if ((currentRowLength + titleLength < TOPIC_TITLE_LIMIT || currentRow.length === 0) && currentRow.length < 3) {
          currentRow.push(tutorial);
          currentRowLength = currentRowLength + titleLength;
        } else {
          currentTopic.rows.push(currentRow);
          currentRow = [];
          currentRow.push(tutorial);
          currentRowLength = titleLength;
        }
      });
      currentTopic.rows.push(currentRow);
      toc.push(currentTopic);
    });
    $scope.toc = toc;

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
