'use strict';
angular
  .module('lkhan', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ui.router',
    'js-data'
  ])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('khan', {
        template: '<ui-view/>',
        abstract: true,
        resolve: {
          content: function (ContentService) {
            return ContentService.loadContent();
          }
        }
      })
      .state('khan.classroom', {
        url: '/',
        controller: 'ClassRoomCtrl',
        templateUrl: 'static/views/classroom.html'
      })
      .state('khan.tutorials', {
        url: '/{topicSlug}/tutorial/{tutorialSlug}',
        controller: 'TutorialCtrl',
        templateUrl: 'static/views/tutorials.html'
      })
      .state('khan.tutorials.exercise', {
        url: '/e/{tutorialContentId}',
        controller: 'ExerciseCtrl',
        templateUrl: 'static/views/exercise.html'
      })
      .state('khan.tutorials.video', {
        url: '/v/{tutorialContentId}',
        controller: 'VideoCtrl',
        templateUrl: 'static/views/video.html'
      })
      .state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: 'static/views/admin.html'
      });

    $translateProvider.translations('en', {
      'NEXT_LESSON': 'Go to next lesson',
      'SHOW_HINT': "I'd like a hint",
      'CHECK_ANSWER': 'Check answer',
      'ANSWER_INCORRECT': 'Incorrect answer, please try again.',
      'ANSWER_CORRECT': 'Correct! Next question...',
      'ANSWER_DONE': 'Awesome! Show points...',
      'ANSWER_NEXT': 'Next'

    });

    $translateProvider.translations('es', {
      'NEXT_LESSON': 'Ir a la siguiente lección',
      'SHOW_HINT': 'Me gustaría una pista',
      'CHECK_ANSWER': 'Comprueba tu respuesta',
      'ANSWER_INCORRECT': 'Respuesta incorrecta, por favor intenta de nuevo.',
      'ANSWER_CORRECT': '¡Correcto! Siguiente pregunta...',
      'ANSWER_DONE': '¡Impresionante! Mostrar los puntos de...',
      'ANSWER_NEXT': 'Proxima'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useCookieStorage();
  })
  .run(function ($rootScope, $state, $stateParams, DS, DSLocalForageAdapter) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    DS.registerAdapter('localforage', DSLocalForageAdapter, {default: true});
  });
