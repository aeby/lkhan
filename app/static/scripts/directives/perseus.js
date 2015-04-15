'use strict';

angular.module('lkhan')
  .directive('perseus', function ($window) {

    return {
      restrict: 'E',
      templateUrl: '/static/views/directives/perseus.html',
      scope: {
        question: '='
      },
      link: function (scope) {

        var itemRendererFactory = React.createFactory($window.Perseus.ItemRenderer);
        var itemMountNode = document.createElement('div');
        scope.answerState = 'Check Answer';

        var itemRenderer = React.render(itemRendererFactory({
          item: scope.question,
          problemNum: Math.floor(Math.random() * 50) + 1,
          initialHintsVisible: 0,
          enabledFeatures: {
            highlight: true,
            toolTipFormats: true
          }
        }, null), itemMountNode);

        itemMountNode.focus();

        scope.checkAnswer = function () {
          var score = itemRenderer.scoreInput();
          if (score.correct) {
            scope.answerState = 'Correct!';
          } else if (!score.empty) {
            scope.answerState = 'Incorrect, try again.';
          }
        };

        scope.hint = function () {
          itemRenderer.showHint();
        };
      }
    };
  });
