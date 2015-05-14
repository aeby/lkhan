'use strict';
var lkMediaDirectives = {};

var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;

function camelCase(name) {
  return name.
    replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).
    replace(MOZ_HACK_REGEXP, 'Moz$1');
}

function directiveNormalize(name) {
  return camelCase(name.replace(PREFIX_REGEXP, ''));
}

angular.forEach(
  'abort canplay canplaythrough durationchange emptied ended error interruptbegin interruptend loadeddata loadedmetadata loadstart onencrypted pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting'.split(' '),
  function (eventName) {
    var directiveName = directiveNormalize('lk-' + eventName);
    lkMediaDirectives[directiveName] = ['$parse', '$rootScope', function ($parse, $rootScope) {
      return {
        restrict: 'A',
        compile: function ($element, attr) {
          // We expose the powerful $event object on the scope that provides access to the Window,
          // etc. that isn't protected by the fast paths in $parse.  We explicitly request better
          // checks at the cost of speed since event handler expressions are not executed as
          // frequently as regular change detection.
          var fn = $parse(attr[directiveName], /* interceptorFn */ null, /* expensiveChecks */ true);
          return function lkEventHandler(scope, element) {
            element.on(eventName, function (event) {
              var callback = function () {
                fn(scope, {$event: event});
              };
              scope.$apply(callback);
            });
          };
        }
      };
    }];
  }
);

angular.module('lkhan').directive(lkMediaDirectives);


