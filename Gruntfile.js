// Generated on 2015-04-13 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Rewrite all requests to index.html
  var modRewrite = require('connect-modrewrite');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  var mathjaxFiles = [
    'MathJax/MathJax.js',
    'MathJax/config/TeX-AMS_HTML-full.js',
    'MathJax/jax/output/HTML-CSS/fonts/TeX/fontdata.js',
    'MathJax/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/Main.js',
    'MathJax/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/Latin1Supplement.js',
    'MathJax/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/GeneralPunctuation.js',
    'MathJax/jax/element/mml/optable/GeneralPunctuation.js',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Math-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_SansSerif-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Main-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Fraktur-Bold.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Size1-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Size4-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_SansSerif-Bold.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Main-Italic.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Typewriter-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Size3-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_AMS-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Main-Bold.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Math-Italic.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Caligraphic-Bold.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Script-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_SansSerif-Italic.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Math-BoldItalic.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Fraktur-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Caligraphic-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/woff/MathJax_Size2-Regular.woff',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Fraktur-Bold.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Size1-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Typewriter-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Main-Bold.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_WinIE6-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Main-Italic.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_AMS-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Caligraphic-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Script-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Fraktur-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Size3-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Caligraphic-Bold.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Size2-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Main-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_WinChrome-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Math-Italic.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Math-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Math-BoldItalic.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_Size4-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_SansSerif-Italic.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_SansSerif-Regular.otf',
    'MathJax/fonts/HTML-CSS/TeX/otf/MathJax_SansSerif-Bold.otf'
  ];

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/static/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/static/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/static/styles/{,*/}*.css',
          '<%= yeoman.app %>/static/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/static/styles',
                connect.static('./app/static/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/static/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/static/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/static/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/static/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/static/styles/'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/static/styles',
        cssDir: '.tmp/static/styles',
        generatedImagesDir: '.tmp/static/images/generated',
        imagesDir: '<%= yeoman.app %>/static/images',
        javascriptsDir: '<%= yeoman.app %>/static/scripts',
        fontsDir: '<%= yeoman.app %>/static/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/static/images',
        httpGeneratedImagesPath: '/static/images/generated',
        httpFontsPath: '/static/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/static/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/static/scripts/{,*/}*.js',
          '!<%= yeoman.dist %>/static/scripts/MathJax/{,*/}*.js',
          '<%= yeoman.dist %>/static/styles/{,*/}*.css',
          '<%= yeoman.dist %>/static/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '!<%= yeoman.dist %>/static/images/avatars/*.png',
          '<%= yeoman.dist %>/static/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/static/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/static/images',
          '<%= yeoman.dist %>/static/styles'
        ]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/static/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/static/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/static/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/static/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'static/views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/static/scripts',
          src: '*.js',
          dest: '.tmp/concat/static/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.html',
            'static/views/{,*/}*.html',
            'static/images/{,*/}*.{webp,ico}',
            'static/styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/static/images',
          dest: '<%= yeoman.dist %>/static/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/static/scripts/perseus/lib/katex',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>/static/styles'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/static/scripts/perseus/lib/mathquill',
          src: 'font/*',
          dest: '<%= yeoman.dist %>/static/styles'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/static/scripts',
          src: mathjaxFiles,
          dest: '<%= yeoman.dist %>/static/scripts'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/static/scripts/pe',
          src: ['ng-perseus-build.js', 'react-with-addons-0.13.3.js'],
          dest: '<%= yeoman.dist %>/static/scripts/pe'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/static/locales',
          src: ['*.json'],
          dest: '<%= yeoman.dist %>/static/locales'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/static/sound',
          src: ['*.ogg'],
          dest: '<%= yeoman.dist %>/static/sound'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/static/styles',
        dest: '.tmp/static/styles/',
        src: '{,*/}*.css'
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: '<%= yeoman.app %>/static/scripts/pe',
          mainConfigFile: '<%= yeoman.app %>/static/scripts/pe/ng-perseus.js',
          name: 'ng-perseus',
          out: '<%= yeoman.app %>/static/scripts/pe/ng-perseus-build.js'
        }
      }
    },

    manifest: {
      generate: {
        options: {
          basePath: '<%= yeoman.dist %>',
          cache: ['{% for asset in assets %}{{asset}}\n{% endfor %}'],
          network: ['*'],
          preferOnline: false,
          verbose: true,
          master: ['index.html'],
          process: function (path) {
            if (path.indexOf('static/scripts/MathJax/') === 0) {
              return path + '\n' + path + '?rev=2.5.1';
            }
            else {
              return path;
            }
          }
        },
        src: '**/*.*',
        dest: 'lkhan.appcache'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: false
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
