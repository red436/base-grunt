module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      test: {
        options: {
          mangle: false
        },
        files: {
          'dist/all.min.js': ['dist/built.js']
        }
      }
    },
    eslint: {
      target: ['src/js/*.js']
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['built.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },
    concat: {
      js: {
        files: {
          'dist/top.js': ['wp-includes/js/jquery/jquery.min.js', 'wp-includes/js/jquery-migrate.min.js', 'wp-content/plugins/toolkit-master/public/js/toolkit-scripts.js'],
          'dist/bottom.js': ['wp-content/plugins/ultimate-elementor/assets/min-js/uael-frontend.min.js', 'wp-content/plugins/elementor-pro/assets/js/webpack-pro.runtime.min.js', 'wp-content/plugins/elementor/assets/js/webpack.runtime.min.js', 'wp-content/plugins/elementor/assets/js/frontend-modules.min.js', 'wp-content/plugins/elementor-pro/assets/lib/sticky/jquery.sticky.min.js', 'wp-content/plugins/elementor-pro/assets/js/frontend.min.js', 'wp-includes/js/jquery/ui/core.min.js', 'wp-content/plugins/elementor/assets/lib/dialog/dialog.min.js', 'wp-content/plugins/elementor/assets/lib/waypoints/waypoints.min.js', 'wp-content/plugins/elementor/assets/lib/share-link/share-link.min.js', 'wp-content/plugins/elementor/assets/lib/swiper/swiper.min.js', 'wp-content/plugins/elementor/assets/js/frontend.min.js', 'wp-includes/js/jquery/ui/mouse.min.js', 'wp-includes/js/jquery/ui/draggable.min.js', 'wp-includes/js/underscore.min.js', 'wp-includes/js/backbone.min.js', 'wp-content/plugins/elementor/assets/lib/backbone/backbone.marionette.min.js', 'wp-content/plugins/elementor/assets/lib/wp-backbone/backbone.radio.min.js', '']
        }
      },
      css: {
        files: {
          'dist/built.css': ['src/css/*.css']
        }
      }
    },
    run: {
     e2etest: {
         options: {
            wait: false
         },
         args: [
            'playtest.js'
         ]
      },
      sdlfb: {
         options: {
            wait: false
         },
         exec: 'cd test-images && echo ' + process.env.PASS + ' | sudo -S sdlfb',
      },
      browserify: {
         options: {
            wait: false
         },
         exec: 'browserify assets/js/app.js -o assets/js/package.js',
      },
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: grunt.option('debug') || false,
          },
          pretty: true
        },
        files: [{
           expand: true,
           src: ['*.pug', '!layout.pug'],
           ext: '.html',
           extDot: 'first'
        }]
      },
    },
    watch: {
      //js: {
      //  tasks: ['run:browserify'],
      //  files: ['assets/js/app.js']
      //},
      //css: {
      //  files: ['src/css/*.css'],
      //  tasks: ['concat:css', 'cssmin'],
      //  options: {
      //    livereload: true
      //  }
      //},
      js: {
        tasks: ['run:browserify'],
        files: ['assets/js/app.js']
      },
      jade: {
        files: ['*.pug'],
        tasks: ['pug'],
      },
      options: {
        livereload: true
      }
    }
  });
  grunt.loadNpmTasks('@sailshq/grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-run');
  grunt.registerTask('run-e2e', 'End to end test.', function() {grunt.task.run('run');});
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('make-pug', ['pug']);
};
