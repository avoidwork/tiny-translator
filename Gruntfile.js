module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		eslint: {
			target: [
				"Gruntfile.js",
				"index.js",
				"lib/*.js"
			]
		}
	});

	// tasks
	grunt.loadNpmTasks("grunt-eslint");

	// aliases
	grunt.registerTask("test", ["eslint"]);
	grunt.registerTask("default", ["test"]);
};
