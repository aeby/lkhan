'use strict';

angular.module('lkhan')
  .directive('perseus', function ($window, PersusService) {

    return {
      restrict: 'E',
      templateUrl: '/static/views/directives/perseus.html',
      scope: {
        question: '='
      },
      link: function (scope) {

        var itemRendererFactory = React.createFactory($window.Perseus.ItemRenderer);
        var itemMountNode = null, itemRenderer = null;

        scope.$watch('question', function () {
          console.log(scope.question);
          // Cleanup old container
          if (itemMountNode) {
            React.unmountComponentAtNode(itemMountNode);
          }
          itemMountNode = document.createElement('div');
          scope.answerState = 'Check Answer';
          itemRenderer = React.render(itemRendererFactory({
            item: scope.question,
            problemNum: Math.floor(Math.random() * 50) + 1,
            initialHintsVisible: 0,
            enabledFeatures: {
              useMathQuill: true
            }
          }, null), itemMountNode);

          // todo: create touch input for numbers
          _.each(scope.question.question.widgets, function(item){console.log(item.options.answerType); });

          itemMountNode.focus();
          PersusService.setItemRenderer(itemRenderer);
        });


        scope.checkAnswer = function () {
          var score = itemRenderer.scoreInput();
          if (score.correct) {
            scope.answerState = 'Correct!';
          } else if (!score.empty) {
            scope.answerState = 'Incorrect, try again.';
          }
        };

        scope.$on('$destroy', function () {
          if (itemMountNode) {
            React.unmountComponentAtNode(itemMountNode);
          }
        });
      }
    };
  });
