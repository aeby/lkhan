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
    $scope.topics = ContentService.getTopicStructure();
  });
