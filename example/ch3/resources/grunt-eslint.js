
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
        options: {
            configFile: 'config/eslint.json',
            rulePaths: ['config/rules']
        },
        target: ['scripts/**/*.js']
    }
  });
    
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-eslint');
  grunt.registerTask('test', ['eslint']);
    
};
