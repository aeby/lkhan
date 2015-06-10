'use strict';
angular.module('lkhan').factory('Student', function ($rootScope, $translate, $q, $lfmo, Activity) {

  var Student = $lfmo.define('student');
  var tutorialProgress = {};

  Student.createValidated = function (data) {
    var defer = $q.defer();

    // validate name
    if (!data.name || data.name.length < 1) {
      defer.reject($translate.instant('ADMIN_USER_INVALID'));
      return defer.promise;
    }

    // check if name is not used
    this.findAll({name: data.name}).then(function (students) {
      if (students.length) {
        defer.reject($translate.instant('ADMIN_USER_EXISTS'));
      } else {
        Student.create(data).then(function (student) {
          defer.resolve(student);
        });
      }
    });

    return defer.promise;
  };


  Student.load = function (studentId) {
    tutorialProgress = {};
    return Student.get(studentId).then(function (student) {
      $rootScope.currentStudent = student;
      return Activity.findAll({
        studentId: $rootScope.currentStudent.id,
        action: Activity.ACTION_EXERCISE_DONE
      });
    }).then(function (activites) {
      _.each(activites, function (activity) {
        if (activity.tutorialSlug in tutorialProgress) {
          tutorialProgress[activity.tutorialSlug].push(activity.tutorialContentId);
        } else {
          tutorialProgress[activity.tutorialSlug] = [activity.tutorialContentId];
        }
      });
      return tutorialProgress;
    });
  };

  Student.remove = function (studentId) {
    return Student.get(studentId).then(function (st) {
      return Student.update(studentId, {
        active: false,
        name: st.name + '_deactivated_' + Date.now()
      });
    });
  };

  function createActivity(topicSlug, tutorialSlug, tutorialContentId, action) {
    // update progress if exercise done
    if (action === Activity.ACTION_EXERCISE_DONE) {
      if (tutorialSlug in tutorialProgress) {
        tutorialProgress[tutorialSlug].push(tutorialContentId);
      } else {
        tutorialProgress[tutorialSlug] = [tutorialContentId];
      }
    }

    return Activity.create({
      topicSlug: topicSlug,
      tutorialSlug: tutorialSlug,
      tutorialContentId: tutorialContentId,
      action: action,
      date: Date.now(),
      studentId: $rootScope.currentStudent.id
    });
  }

  Student.setActivity = function (topicSlug, tutorialSlug, tutorialContentId, action) {
    // check if exercise already done
    if (action === Activity.ACTION_EXERCISE_DONE) {
      return Activity.findAll({
        studentId: $rootScope.currentStudent.id,
        action: Activity.ACTION_EXERCISE_DONE,
        tutorialContentId: tutorialContentId
      }).then(function (activites) {
        if (activites.length > 0) {
          return createActivity(topicSlug, tutorialSlug, tutorialContentId, Activity.ACTION_EXERCISE_REDONE);
        } else {
          return createActivity(topicSlug, tutorialSlug, tutorialContentId, action);
        }
      });
    } else {
      return createActivity(topicSlug, tutorialSlug, tutorialContentId, action);
    }
  };

  Student.getTutorialProgress = function () {
    return tutorialProgress;
  };

  Student.getCompletedExercises = function (tutorialSlug) {
    return tutorialProgress[tutorialSlug];
  };

  return Student;
});
