module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'html2js:dev',
    'sass:dev',
		'copy:dev'
	]);
};
