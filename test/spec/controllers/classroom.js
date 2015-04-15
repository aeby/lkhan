'use strict';

describe('Controller: Classroom', function () {

  // load the controller's module
  beforeEach(module('lkhan'));

  var ClassRoomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassRoomCtrl = $controller('ClassRoomCtrl', {
      $scope: scope
    });
  }));

  it('should attach a question to the scope', function () {
    expect(scope.question).not.toBe(null);
  });
});
