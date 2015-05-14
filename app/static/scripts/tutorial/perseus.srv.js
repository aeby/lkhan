'use strict';

angular.module('lkhan')
  .service('PersusService', function () {

    var itemRenderer;

    this.setItemRenderer = function (ir) {
      itemRenderer = ir;
    };

    this.showHint = function () {
      return itemRenderer.showHint();
    };

    this.scoreInput = function () {
      return itemRenderer.scoreInput();
    };
  });
