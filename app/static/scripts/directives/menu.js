'use strict';

angular.module('lkhan')
  .directive('lkMenu', function ($document) {

    return {
      restrict: 'E',
      templateUrl: 'static/views/directives/menu.html',
      scope: {
        menuItems: '='
      },
      link: function ($scope, $element) {
        $scope.showMenu = false;

        $scope.toggleMenu = function ($event) {
          if ($event.currentTarget === $event.target) {
            $scope.showMenu = !$scope.showMenu;
          }
        };

        function closeMenu(evt) {
          if (evt && $element[0].contains(evt.target)) {
            return;
          }
          $scope.showMenu = false;
          $scope.$apply();
        }

        $document.bind('click', closeMenu);

        $scope.$on('$destroy', function () {
          $document.unbind('click', closeMenu);
        });
      }
    };
  });
