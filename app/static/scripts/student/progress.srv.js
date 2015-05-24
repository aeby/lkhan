'use strict';

angular.module('lkhan')
  .service('ProgressService', function (ContentService) {
    var currentStudent = null;

    this.setStudent = function (student) {
      currentStudent = student;

    };

    // log activity, calculate next assessment and store tutorial progress
    this.logActivity = function (tutorial, question, answer, correct) {

    };

    // get progress of each tutorial in topic
    this.topicProgress = function (topic) {
      _.each(topic.tutorials, function (tutorial) {
        var tutorialContents = ContentService.getTutorialContents(topic.slug, tutorial.slug);
        _.each(tutorialContents, function (tc) {
          if (tc.type === 'e') {

          }

        });
      });
    };
  });
