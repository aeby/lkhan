'use strict';

angular.module('lkhan')
  .service('PerseusService', function ($q) {

    var itemRenderer, hints = $q.defer();

    this.setItemRenderer = function (ir) {
      itemRenderer = ir;
      hints.resolve(itemRenderer.getNumHints());
      hints = $q.defer();
    };

    this.showHint = function () {
      return itemRenderer.showHint();
    };

    this.getNumHints = function () {
      return hints.promise;
    };

    this.scoreInput = function () {
      return itemRenderer.scoreInput();
    };
  });
