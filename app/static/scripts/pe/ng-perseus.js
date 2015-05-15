'use strict';
require(['../perseus/ke-deps', '../perseus/build/perseus-3'], function (deps, Perseus) {
  Perseus.init({}).then(function () {
    window.Perseus = Perseus;
    angular.bootstrap(document, ['lkhan']);
  });
});
