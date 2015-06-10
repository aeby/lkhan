'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('lkhan')
  .controller('StatsCtrl', function ($scope, $rootScope, $translate, $state, ContentService, Activity) {

    if (!$rootScope.currentStudent) {
      $state.go('khan.classroom');
      return;
    }

    Activity.findAll({
      studentId: $rootScope.currentStudent.id
    }).then(function (activities) {
      var viewActivities = [];
      for (var i = 0; i < Math.min(100, activities.length); i = i + 1) {
        var activity = activities[i];
        var tc = ContentService.getTutorialContent(activity.topicSlug, activity.tutorialSlug, activity.tutorialContentId, 'e');
        activity.title = tc ? tc.title : '';
        activity.class = 'action-' + activity.action;
        if (activity.action === Activity.ACTION_EXERCISE_DONE) {
          activity.msg = $translate.instant('ACTION_EXERCISE_DONE');
        } else if (activity.action === Activity.ACTION_CORRECT) {
          activity.msg = $translate.instant('ACTION_CORRECT');
        } else if (activity.action === Activity.ACTION_WRONG) {
          activity.msg = $translate.instant('ACTION_WRONG');
        } else if (activity.action === Activity.ACTION_HINT) {
          activity.msg = $translate.instant('ACTION_HINT');
        } else if (activity.action === Activity.ACTION_EXERCISE_REDONE) {
          activity.msg = $translate.instant('ACTION_EXERCISE_REDONE');
        }
        viewActivities.push(activity);
      }
      $scope.activities = viewActivities;
    });
  });
