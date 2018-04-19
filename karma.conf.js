// Karma configuration file, see link for more information
// httpskarma-runner.github.io1.0configconfiguration-file.html

module.exports = function (config) {
  config.set({
    basePath '',
    frameworks ['jasmine', '@angularcli'],
    plugins [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angularclipluginskarma')
    ],
    client{
      clearContext false  leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter {
      reports [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths true
    },
    angularCli {
      environment 'dev'
    },
    reporters ['progress', 'kjhtml'],
    port 9876,
    colors true,
    logLevel config.LOG_INFO,
    autoWatch true,
    browsers ['Chrome'],
    singleRun false
  });
};