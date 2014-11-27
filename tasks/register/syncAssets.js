module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'html2js:dev',
		'less:dev',
    'sass:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
