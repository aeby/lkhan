'use strict';
angular
  .module('lkhan', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
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
      .state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: 'static/views/admin.html'
      });
  })
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    //DS.registerAdapter('localforage', DSLocalForageAdapter, {default: true});

  });
