/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('bootmap-ef generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('bootmap-ef:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'index.html',
      'css/bootstrapmap.css',
      'css/overrides.css',
      'js/app.js',
      'js/bootstrapmap.js'
    ];

    helpers.mockPrompt(this.app, {
      'appName': 'TestApp',
      'gitHubAccount': 'someuser',
      'themeStyle': 'light'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
