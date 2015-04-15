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
        /*resolve: {
         topicStructure: function (TopicService) {
         return TopicService.loadTopicStructure();
         }
         }*/
      })
      .state('khan.classroom', {
        url: '/',
        controller: 'ClassRoomCtrl',
        templateUrl: 'static/views/main.html'
      })
      .state('khan.tutorials', {
        url: '/{topicId}/tutorial/{tutorialId}',
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
