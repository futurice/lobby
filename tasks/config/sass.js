/**
 * Compiles SASS files into CSS.
 */
module.exports = function(grunt) {

	grunt.config.set('sass', {
	  dev: {
	    options: {
	      style: 'expanded'
	    },
	    files: [{
	      expand: true,
	      cwd: 'assets/styles/',
	      src: ['importer.scss'],
	      dest: '.tmp/public/styles/',
	      ext: '.css'
	    },
      {
        expand: true,
        cwd: 'assets/styles/',
        src: ['mediascreen.sass'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }]
	  }
	});

	grunt.loadNpmTasks('grunt-sass');
};
