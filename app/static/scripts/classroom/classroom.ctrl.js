'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:ClassRoomCtrl
 * @description
 * # ClassRoomCtrl
 * Controller of the lkhan
 */
angular.module('lkhan')
  .controller('ClassRoomCtrl', function ($scope, $log, $translate, ContentService) {
    var topics = ContentService.getTopicStructure();
    //$scope.topics = ContentService.getTopicStructure();

    var toc = [], LIMIT = 55;

    // layout
    _.each(topics, function(topic){

      var currentRow = [], currentRowLength=0, currentTopic = {
        title: topic.title,
        slug: topic.slug,
        rows: []
      };

      _.each(topic.tutorials, function(tutorial){
        var titleLength = tutorial.title.length;
        if ((currentRowLength + titleLength < LIMIT || currentRow.length === 0) && currentRow.length < 3){
          currentRow.push(tutorial);
          currentRowLength = currentRowLength + titleLength;
        }else{
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
  });
