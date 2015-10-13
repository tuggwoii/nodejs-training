
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
        unit: {
            configFile: 'config/karma.conf.js'
        }
    }
  });
    
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('test', ['karma']);
    
};