module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['Gruntfile.js', 'js/src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'index2.html': ['templates/jade/*.jade']
                }
            }
        },

        casperjs: {
            options: {
                async: {
                    parallel: true
                }
            },
            files: ['tests/casperjs/spec/*.js']
        },

        jasmine: {
            src: 'js/src/**/*.js',
            options: {
                specs: 'tests/jasmine/test_*.js',
                helpers: 'tests/helpers/helper_*.js',
                vendor: 'vendor/**/*.js'
            }
        },


        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['casperjs']
        }
    });


    // basics
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-casperjs');

    // default
    grunt.loadNpmTasks('grunt-contrib-watch');


    // tasks
    grunt.registerTask('test', ['casperjs']);

};