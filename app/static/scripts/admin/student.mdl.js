angular.module('lkhan').factory('Student', function (DS) {

  return DS.defineResource({
    name: 'student',

    beforeCreate: function (resourceName, attrs, cb) {
      DS.findAll('student', {name: attrs.name}).then(function (students) {
        if (students.length) {
          cb('Ya hay un estudiante con este nombre');
        } else {
          cb(null, attrs);
        }
      });
    },
    validate: function (resourceName, attrs, cb) {
      if (!attrs.name || attrs.name.length < 1) {
        cb('Nombre inválido');
      } else {
        cb(null, attrs);
      }
    }
  });
});
