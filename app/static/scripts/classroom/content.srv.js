'use strict';

angular.module('lkhan')
  .service('ContentService', function ($http, $q) {

    const TOPIC_TITLE_LIMIT = 55;
    var topics = null,
      toc = [],
      topicIndex = null,
      exercises = null,
      videos = null,
      colors = ['blue', 'green', 'red', 'green', 'red', 'blue', 'green', 'green', 'red', 'blue', 'blue', 'green', 'red',
        'green', 'blue', 'blue', 'green', 'blue', 'blue', 'green'];

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

          // create TOC, colorize tutorials and calculate total exercises
          var colorIndex = 0, colorLength = colors.length;
          _.each(topics, function (topic) {
            var currentRow = [], currentRowLength = 0, currentTopic = {
              title: topic.title,
              slug: topic.slug,
              rows: []
            };
            _.each(topic.tutorials, function (tutorial) {
              var titleLength = tutorial.title.length;
              if ((currentRowLength + titleLength < TOPIC_TITLE_LIMIT || currentRow.length === 0) && currentRow.length < 3) {
                currentRow.push(tutorial);
                currentRowLength = currentRowLength + titleLength;
              } else {
                currentTopic.rows.push(currentRow);
                currentRow = [];
                currentRow.push(tutorial);
                currentRowLength = titleLength;
              }
              tutorial.color = colors[colorIndex % colorLength];
              tutorial.total = _.filter(tutorial.tutorialContents, {type: 'e'}).length;
              colorIndex = colorIndex + 1;
            });

            currentTopic.rows.push(currentRow);
            toc.push(currentTopic);
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

    this.getTOC = function () {
      return toc;
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

    this.getTutorialContent = function (topicSlug, tutorialSlug, tutorialContentId, type) {
      return _.filter(this.getTutorialContents(topicSlug, tutorialSlug), {'type': type, 'id': tutorialContentId})[0];
    };

    this.getVideo = function (videoId) {
      return videos[videoId];
    };

    this.getExercises = function (tutorialContentId) {
      return exercises[tutorialContentId];
    };
  });
