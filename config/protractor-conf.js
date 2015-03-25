exports.config = {

  allScriptsTimeout: 300000,

  specs: [
    '../tests/e2e/**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:1337/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    includeStackTrace : true,
    isVerbose : true,
    showColors:true
  },

  chromeDriver: 'C:/futurice/chromedriver.exe',
  seleniumServerJar: 'C:/futurice/lobby/node_modules/selenium/lib/runner/selenium-server-standalone-2.20.0.jar',
  baseUrl: 'http://localhost:1337/'
};
