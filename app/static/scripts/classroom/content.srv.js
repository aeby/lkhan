'use strict';

angular.module('lkhan')
  .service('ContentService', function ($http, $q) {

    var topics = null,
      topicIndex = null,
      exercises = null,
      videos = null;

    this.loadContent = function () {
      var deferredTopics = $q.defer(),
        deferredExercises = $q.defer(),
        deferredVideos = $q.defer();

      $http.get('static/khan/topics.json')
        .success(function (data) {
          topics = data.topics;
          topicIndex = _.indexBy(topics, 'slug');
          deferredTopics.resolve(data);
          return topics;
        })
        .error(function (response) {
          deferredTopics.reject(response);
        });

      $http.get('static/khan/exercises.json')
        .success(function (data) {
          exercises = data;
          deferredExercises.resolve(data);
          return exercises;
        })
        .error(function (response) {
          deferredExercises.reject(response);
        });

      $http.get('static/khan/videos.json')
        .success(function (data) {
          videos = data;
          deferredVideos.resolve(data);
          return videos;
        })
        .error(function (response) {
          deferredVideos.reject(response);
        });


      return $q.all({video: deferredTopics.promise, exercises: deferredExercises.promise, videos: deferredVideos.promise}).then(function (data) {
        return data;
      });
    };

    this.getTopicStructure = function () {
      return topics;
    };

    this.getTopic = function (topicSlug) {
      return topicIndex[topicSlug];
    };

    this.getTutorialContents = function (topicSlug, tutorialSlug) {
      return _.filter(this.getTopic(topicSlug)['tutorials'], {'slug': tutorialSlug})[0]['tutorial_contents']
    };

    this.getVideo = function (videoId) {
      return videos[videoId];
    };

  });
