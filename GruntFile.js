module.exports = function ( grunt ) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. 
	require('time-grunt')(grunt);

	function initConfig() {

		grunt.config.init( {
			// Project settings
			paths: {
				// configurable paths
				src: 'src',
				app: 'app',
				dist: 'dist'
			},

			pkg: grunt.file.readJSON('package.json'),

			// create the server with livereload
			express: {
				server: {
					options: {
						port: 9001,
						bases: '<%= paths.app %>/',
						hostname: '0.0.0.0',
						livereload: true,
						open: true
					}
				}
			},

			// Watch files 
			watch: {
				options: {
					nospawn: true,
					livereload: true
				},
				coffee: {
					files: [ '<%= paths.src %>/coffee/**/*.coffee' ],
					tasks: [ 'newer:coffee:compile', 'notify:coffee' ],
				},
				stylus: {
					files: [ '<%= paths.src %>/stylus/**/*.styl' ],
					tasks: [ 'newer:stylus', 'notify:stylus' ],
				},
				jade: {
					files: [ '<%= paths.src %>/jade/index.jade' ],
					tasks: [ 'newer:jade:compile', 'bowerInstall', 'notify:jade' ],
				},
				bower: {
					files: ['bower.json'],
					tasks: ['bowerInstall']
				},
			},

			// Compile task
			jade: {
				compile: {
					options: {
						compileDebug: false,
						pretty: true,
					},
					files:{
						'<%= paths.app %>/index.html' : '<%= paths.src %>/jade/**/*.jade'
					}
				}
			},

			coffee: {

				compile: {
					options: {
						bare: true
					},
					expand: true,
					flatten: false,
					cwd: '<%= paths.src %>/coffee',
					src: '**/*.coffee',
					dest: '<%= paths.app %>/js',
					ext: '.js'
				}
			},

			stylus: {
				compile: {
					options: {
						compress: false,
						firebug: false,
						urlfunc: 'url'
					},
					expand: true,
					flatten: true,
					cwd: '<%= paths.src %>/stylus',
					src: '**/*.styl',
					dest: '<%= paths.app %>/css',
					ext: '.css'
				}
			},

			// Automatically inject Bower components into the app
			bowerInstall: {
				app: {
					src: ['<%= paths.app %>/index.html'],
					ignorePath: '<%= paths.app %>/'
				}
			},
			
			// Empties folders to start fresh
			clean: {
				dist: {
					files: [{
						dot: true,
						src: [
							'.tmp',
							'<%= paths.dist %>/*',
							'!<%= paths.dist %>/.git*'
						]
					}]
				},
				server: '.tmp'
			},

			copy: {
				dist:{
					files: [
						{
						expand: true,
							dot: true,
							cwd: '<%= paths.app %>',
							dest: '<%= paths.dist %>',
							src: [
								'*.{ico,png,txt}',
								'.htaccess',
								'webapp.appcache',
								'robots.txt',
								'*.html',
								'img/{,*/}*.{webp,svg}',
								'fonts/*.*'
							]
						},
						{
							expand: true,
							cwd: '<%= paths.app %>/css',
							dest: '.tmp/css/',
							src: '{,*/}*.css'
						}
					]
				},
			},

			// Optimizing tasks
			useminPrepare: {
				html: '<%= paths.app %>/index.html',
				options: {
					dest: '<%= paths.dist %>',
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

			usemin: {
				html: ['<%= paths.dist %>/*.html'],
				css: ['<%= paths.dist %>/css/**/*.css'],
				options: {
					assetsDirs: ['<%= paths.dist %>']
				}
			},
				
			cssmin: {
				src: ['*.css', '!*.min.css'],
				dest: '<%= paths.dist %>/css/',
			},

			imagemin: {
				dynamic: {
					options: {
						optimizationLevel: 7
					},
					files: [ {
						expand: true,
						cwd: '<%= paths.app %>/img/',
						dest: '<%= paths.dist %>/img/',
						src: [ '**/*.{png,jpg,jpeg,gif}']
					}]
				}
			},

			svgmin: {
				dist: {
					files: [{
						expand: true,
						cwd: '<%= paths.app %>/img/',
						src: '**/*.svg',
						dest: '<%= paths.dist %>/img/'
					}]
				}
			},

			rev: {
				files: {
					src: ['<%= paths.dist %>/js/**/*.js', '<%= paths.dist %>/css/**/*.css']
				}
			},

			// Fancy
			notify: {
				server: { options: { message: 'Server is ready on port : 9001' } },
				compile: { options: { message: 'Jade / Coffeescript / Stylus compiled with success'} },
				jade: { options: { message: 'Jade compiled with success'} },
				stylus: { options: { message: 'Stylus compiled with success'} },
				coffee: { options: { message: 'Coffeescript compiled with success'} },
				build: { options: { message: 'Build completed'} }
			},

			// Run some tasks in parallel to speed up the build process
			concurrent: {
				compile: [
					'jade:compile',
					'coffee:compile',
					'stylus'
				],
			},

		});
	}

	// Init
	initConfig();

	// Main tasks
	grunt.registerTask( 'compile', [ 'concurrent:compile', 'bowerInstall:app',  'notify:compile' ] )
	grunt.registerTask( 'build', [ 'clean:dist', 'compile', 'useminPrepare', 'concat', 'copy:dist', 'uglify', 'cssmin', 'imagemin', 'svgmin', 'rev', 'usemin','clean:server', 'notify:build' ] )
	grunt.registerTask( 'test', ['clean:server', 'compile', 'express', 'notify:server', 'watch'] );
	grunt.registerTask( 'default', 'test' );
}
