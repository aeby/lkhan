'use strict';

angular.module('lkhan')
  .service('ContentService', function ($http, $q) {

    var topics = null,
      topicIndex = null,
      exercises = null,
      videos = null,
      colors = ['blue', 'green', 'red', 'green', 'red', 'blue', 'green', 'green', 'red', 'blue', 'blue', 'green', 'red', 'green', 'blue', 'blue', 'green', 'blue', 'blue', 'green'];

    this.loadContent = function () {
      var deferredTopics = $q.defer(),
        deferredExercises = $q.defer(),
        deferredVideos = $q.defer();

      // already loaded
      if (topics && exercises && videos) {
        return {
          topics: topics,
          exercises: exercises,
          videos: videos
        };
      }

      $http.get('static/khan/topics.json')
        .success(function (data) {
          topics = data.topics;
          topicIndex = _.indexBy(topics, 'slug');

          // colorize tutorials add calculate total exercises
          var cIndex = 0, colorLength = colors.length;
          _.each(topics, function (topic) {
            _.each(topic.tutorials, function (tutorial) {
              tutorial.color = colors[cIndex % colorLength];
              tutorial.total = _.filter(tutorial.tutorialContents, {type: 'e'}).length;
              cIndex = cIndex + 1;
            });
          });

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


      return $q.all({
        topics: deferredTopics.promise,
        exercises: deferredExercises.promise,
        videos: deferredVideos.promise
      }).then(function (data) {
        return data;
      });
    };

    this.getTopicStructure = function () {
      return topics;
    };

    this.getTopic = function (topicSlug) {
      return topicIndex[topicSlug];
    };

    this.getTutorial = function (topicSlug, tutorialSlug) {
      return _.filter(this.getTopic(topicSlug).tutorials, {'slug': tutorialSlug})[0];
    };

    this.getTutorialContents = function (topicSlug, tutorialSlug) {
      return this.getTutorial(topicSlug, tutorialSlug).tutorialContents;
    };

    this.getVideo = function (videoId) {
      return videos[videoId];
    };

    this.getExercises = function (tutorialContentId) {
      return exercises[tutorialContentId];
    };

  });
