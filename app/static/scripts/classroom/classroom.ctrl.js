'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('lkhan')
  .controller('ClassRoomCtrl', function ($scope, $log, ContentService, content) {
    $scope.topics = ContentService.getTopicStructure();
  });
