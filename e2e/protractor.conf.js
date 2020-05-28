const { SpecReporter } = require('jasmine-spec-reporter');
const fs = require('fs');
const log4js = require('log4js');
const HtmlReporter = require('protractor-beautiful-reporter');
const tsConfig = require('../tsconfig.json');

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['src/tests/*.e2e-spec.ts'],

  suites: {
    full: 'src/tests/*.e2e-spec.ts'
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      // args: ['--disable-browser-side-navigation']
      args: ['--disable-gpu']
    }
  },
  directConnect: true,
  baseUrl: 'https://www.google.com/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function () { }
  },
  onPrepare() {
    //browser.logger = log4js.getLogger('log');
    browser.ignoreSynchronization = true;
    // Logger = './src_new/utils/logger2.js';
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    require('tsconfig-paths').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json'),
      baseUrl: './',
      // taking paths from '../../../tsconfig.e2e.json to make aliases work'
      paths: tsConfig.compilerOptions.paths
    });


    jasmine
      .getEnv()
      .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(
      new HtmlReporter({
        baseDirectory: 'e2e/logs/testReport',
        preserveDirectory: false,
        screenshotsSubfolder: 'images',
        jsonsSubfolder: 'jsons'
      }).getJasmine2Reporter()
    );
    browser.driver
      .manage()
      .window()
      .maximize();
  },
  beforeLaunch: function () {
    if (fs.existsSync('e2e/logs/ExecutionLog.log')) {
      fs.unlink('e2e/logs/ExecutionLog.log', err => {
        if (err) {
          console.log('failed to delete log file');
        }
      });
    }
    log4js.configure(require('path').join(__dirname, './log4js.conf.json'));
  },
  SELENIUM_PROMISE_MANAGER: false
};
