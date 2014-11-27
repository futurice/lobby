module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'html2js:dev',
		'less:dev',
    'sass:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
