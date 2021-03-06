'use strict';
angular
  .module('lkhan', [
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ui.router',
    'angular-lfmo'
  ])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
    var base = document.querySelector('base');
    var baseUrl = base && base.href || '/';
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('khan', {
        template: '<div ui-view></div>',
        abstract: true,
        resolve: {
          content: function ($rootScope, ContentService) {
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
        templateUrl: 'static/views/tutorial.html'
      })
      .state('khan.exercise', {
        url: '/{topicSlug}/tutorial/{tutorialSlug}/e/{tutorialContentId}',
        controller: 'ExerciseCtrl',
        templateUrl: 'static/views/exercise.html'
      })
      .state('khan.video', {
        url: '/{topicSlug}/tutorial/{tutorialSlug}/v/{tutorialContentId}',
        controller: 'VideoCtrl',
        templateUrl: 'static/views/video.html'
      })
      .state('khan.stats', {
        url: '/stats',
        controller: 'StatsCtrl',
        templateUrl: 'static/views/stats.html'
      })
      .state('khan.admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: 'static/views/admin.html',
        data: {
          requireLogin: true
        }
      })
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'static/views/login.html'
      });

    $translateProvider.useStaticFilesLoader({
      prefix: baseUrl + 'static/locales/',
      suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.preferredLanguage('en');
    $translateProvider.useCookieStorage();
  })
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // set default password to 1234
    localforage.getItem('lk-pw').then(function (pw) {
      if (!pw) {
        localforage.setItem('lk-pw', '1234');
      }
    });

    // perseus graphie loads jsonp with default cache false & this is really bad for our cache manifest.
    $.ajaxSetup({
      cache: true
    });

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (toState.data && toState.data.requireLogin && !$rootScope.loggedIn) {
        event.preventDefault();
        $state.go('login');
      } else {
        $rootScope.loggedIn = false;
      }
    });
  });
