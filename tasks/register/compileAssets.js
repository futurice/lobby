module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'html2js:dev',
    'sass:dev',
    'concat',
		'copy:dev'
	]);
};
