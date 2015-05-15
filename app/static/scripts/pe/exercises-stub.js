'use strict';
window.Exercises = {
  localMode: true,
  useKatex: true,
  khanExercisesUrlBase: '/',

  getCurrentFramework: function () {
    return 'khan-exercises';
  },

  PerseusBridge: {
    cleanupProblem: function () {
      return false;
    }
  }
};
