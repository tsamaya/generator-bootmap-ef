'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BootmapEfGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.pkg = require('../package.json');

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous BootmapEf generator!'));

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('Let\'s make maps!'));

        var prompts = [{
            name: 'appName',
            message: 'What is the name of this app?'
        }, {
            name: 'gitHubAccount',
            message: 'What is your github account? (for package.json)'
        }, {
            name: 'themeStyle',
            message: 'Theme style? (dark | light)',
            choices: ['dark', 'light'],
            default: 'dark'
        }, {
            name: 'homeWidget',
            message: 'Home widget? (yes | no)',
            choices: ['yes', 'no'],
            default: 'yes'
        }, {
            name: 'locationWidget',
            message: 'Location widget? (yes | no)',
            choices: ['yes', 'no'],
            default: 'yes'
        }, {
            name: 'geocoderWidget',
            message: 'Geocoder widget? (yes | no)',
            choices: ['yes', 'no'],
            default: 'yes'
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            this.authorName = props.authorName;
            this.navClass = 'navbar-inverse';
            if (props.themeStyle !== 'dark') {
                this.navClass = 'navbar-default';
            }
            this.homeWidget = (props.homeWidget === 'yes');
            this.locationWidget = (props.locationWidget === 'yes');
            this.geocoderWidget = (props.geocoderWidget === 'yes');
            this.gitHubAccount = props.gitHubAccount;
            done();
        }.bind(this));
    },

    scaffoldFolders: function() {
        this.mkdir("js");
        this.mkdir("css");
    },

    app: function() {
        // NOTE: this is needed b/c _app.js has ES6 style interpolation delimiters
        // see: https://github.com/lodash/lodash/issues/399
        this._.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

        this.template('_README.md', 'README.md');
        this.template('_index.html', 'index.html');
        this.template('./js/_app.js', './js/app.js');
    },

    projectfiles: function() {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');

        this.copy('gitignore', '.gitignore');
        this.copy('gruntfile.js', 'gruntfile.js');
        this.copy('license.txt', 'license.txt');

        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');

        this.directory('css', 'css');

        this.copy('./js/apprise-v2.js', './js/apprise-v2.js');
        this.copy('./js/bootstrapmap.js', './js/bootstrapmap.js');
    }
});

module.exports = BootmapEfGenerator;
