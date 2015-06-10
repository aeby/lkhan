'use strict';
angular.module('lkhan').factory('Activity', function ($lfmo) {
  var Activity = $lfmo.define('activity');

  Activity.ACTION_HINT = 'h';
  Activity.ACTION_CORRECT = 'c';
  Activity.ACTION_WRONG = 'w';
  Activity.ACTION_EXERCISE_DONE = 'd';
  Activity.ACTION_EXERCISE_REDONE = 'rd';

  return Activity;
});
