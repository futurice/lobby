module.exports = function (grunt) {
	grunt.registerTask('build', [
		'compileAssets',
    'concat',
		//'linkAssetsBuild',
		'clean:build',
		'copy:build'
	]);
};
