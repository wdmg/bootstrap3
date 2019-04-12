/*!
 * Main gruntfile for Bootstrap3 template
 * Homepage: https://wdmg.com.ua/
 * Author: Vyshnyvetskyy Alexsander (alex.vyshyvetskyy@gmail.com)
 * Copyright 2019 W.D.M.Group, Ukraine
 * Licensed under MIT
*/

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
			jquery: {
				src: [
					'node_modules/jquery/dist/jquery.js'
				],
				dest: 'assets/js/jquery.js'
			},
			bootstrap: {
				src: [
					'node_modules/bootstrap/dist/js/bootstrap.js'
				],
				dest: 'assets/js/bootstrap.js'
			}
        },
		copy: {
			bootstrap: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/bootstrap/less',
						src: ['**'],
						dest: 'assets/less/bootstrap',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'node_modules/bootstrap/less',
						src: 'mixins/*.less',
						dest: 'assets/less/bootstrap',
						filter: 'isFile'
					},
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap/fonts',
                        src: ['**'],
                        dest: 'assets/fonts',
                        filter: 'isFile'
                    }
				]
			}
        },
        uglify: {
            jquery: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/jquery.js.map'
                },
                files: {
                    'assets/js/jquery.min.js': ['assets/js/jquery.js']
                }
            },
            bootstrap: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/bootstrap.js.map'
                },
                files: {
                    'assets/js/bootstrap.min.js': ['assets/js/bootstrap.js']
                }
            },
            main: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/main.js.map'
                },
                files: {
                    'assets/js/main.min.js': ['assets/js/main.js']
                }
            }
        },
		less: {
			style: {
				files: {
					'assets/css/ie.css': ['assets/less/ie.less'],
					'assets/css/style.css': ['assets/less/style.less']
				}
			}
		},
        autoprefixer: {
            dist: {
                files: {
                    'assets/css/ie.css': ['assets/css/ie.css'],
                    'assets/css/style.css': ['assets/css/style.css']
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'assets/css/ie.min.css': ['assets/css/ie.css'],
                    'assets/css/style.min.css': ['assets/css/style.css']
                }
            }
        },
		watch: {
			styles: {
				files: ['assets/less/ie.less', 'assets/less/style.less'],
				tasks: ['less:style', 'cssmin'],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ['assets/js/main.js'],
				tasks: ['uglify:main'],
				options: {
					spawn: false
				}
			}
		}
    });
	
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.registerTask('default', ['concat', 'copy', 'uglify', 'less', 'autoprefixer', 'cssmin', 'watch']);
};