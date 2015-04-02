/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less files, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 * mods by jrt
 */
module.exports = function(grunt) {

	var fontsToCopy = require('../pipeline').fontFilesToInject;
  var imagesToCopy = require('../pipeline').imageFilesToInject;
	grunt.config.set('copy', {
		dev: {
			files: [
        {
          nonull: true,
          expand:true,
          flatten: true,
          cwd: './assets',
          src: [fontsToCopy],
          //changed this to specific folder because fontawesome needs it.
          //considered it better than change fontawesome.css by hand
          dest: '.tmp/public/bower_components/fontawesome/fonts'
        },
        {
          nonull: true,
          expand:true,
          flatten: true,
          cwd: './assets',
          src: [imagesToCopy],
          dest: '.tmp/public/images'
        }
      ]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
