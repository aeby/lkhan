'use strict';

/**
 * @ngdoc function
 * @name lkhan.controller:ClassRoomCtrl
 * @description
 * # MainCtrl
 * Controller of the lkhan
 */
/* jshint ignore:start */
angular.module('lkhan')
  .controller('ClassRoomCtrl', function ($scope) {
    $scope.question = {
      "question": {
        "content": "**\u00bfQu\u00e9 n\u00famero falta?**  \n[[\u2603 input-number 1]]\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/743d57124894632ba5d1174bce6ed87bf6ae283b.png)",
        "images": {
          "https://ka-perseus-graphie.s3.amazonaws.com/743d57124894632ba5d1174bce6ed87bf6ae283b.png": {
            "width": 400,
            "height": 300
          }
        },
        "widgets": {
          "input-number 1": {
            "version": {"major": 0, "minor": 0},
            "type": "input-number",
            "graded": true,
            "options": {
              "maxError": 0.1,
              "inexact": false,
              "value": 15,
              "simplify": "required",
              "answerType": "number",
              "size": "normal"
            }
          }
        }
      },
      "answerArea": {"calculator": false, "type": "multiple", "options": {"content": "", "images": {}, "widgets": {}}},
      "itemDataVersion": {"major": 0, "minor": 1},
      "hints": [{"content": "Falta el $\\pink{15}$.", "images": {}, "widgets": {}}]
    };
  });
/* jshint ignore:end */
