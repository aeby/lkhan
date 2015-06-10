'use strict';

angular.module('lkhan')
  .directive('progressDot', function () {
    return {
      restrict: 'E',
      templateUrl: '/static/views/directives/progress-dot.html',
      scope: {
        type: '='
      }
    };
  });
