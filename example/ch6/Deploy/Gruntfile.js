module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
        options: {
            configFile: 'config/eslint.json',
            rulePaths: ['config/rules']
        },
        target: ['scripts/**/*.js', 'index.js', 'server_modules/**/*.js']
    },
    karma: {
        unit: {
            configFile: 'config/karma.conf.js'
        }
    }
  });
    
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('test', ['eslint','karma']);
    
};
