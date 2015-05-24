'use strict';
angular.module('lkhan').factory('Student', function ($translate, DS) {

  return DS.defineResource({
    name: 'student',

    beforeCreate: function (resourceName, attrs, cb) {
      DS.findAll('student', {name: attrs.name}).then(function (students) {
        if (students.length) {
          cb($translate.instant('ADMIN_USER_EXISTS'));
        } else {
          cb(null, attrs);
        }
      });
    },
    validate: function (resourceName, attrs, cb) {
      if (!attrs.name || attrs.name.length < 1) {
        cb($translate.instant('ADMIN_USER_INVALID'));
      } else {
        cb(null, attrs);
      }
    }
  });
});
