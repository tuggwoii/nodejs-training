module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: ['scripts/main.js','test/**/*.js'],
    exclude: [],
    preprocessors: { },
    reporters: ['dots'],
    port: 9000,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true
  });
};
