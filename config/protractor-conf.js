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
  }
};
