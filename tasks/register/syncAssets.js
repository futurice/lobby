module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'html2js:dev',
    'sass:dev',
    'concat',
		'sync:dev',
	]);
};
