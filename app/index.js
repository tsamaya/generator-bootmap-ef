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
            default: 'dark'
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            this.authorName = props.authorName;
            this.navClass = 'navbar-inverse';
            if (props.themeStyle !== 'dark') {
                this.navClass = 'navbar-default';
            }
            this.gitHubAccount = props.gitHubAccount;

            done();
        }.bind(this));
    },

    app: function() {
        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');

        this.mkdir('css');
        this.mkdir('js');
        this.copy('_index.html', 'index.html');
        //this.template('_index.html', 'index.html');
        //this.template('_package.json', 'package.json');
    },

    projectfiles: function() {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');

        this.directory('css', 'css');
        this.directory('js', 'js');
        this.copy('gitignore', '.gitignore');
        this.copy('gruntfile.js', 'gruntfile.js');
        this.copy('license.txt', 'license.txt');
        this.template('_README.md', 'README.md');
        //this.template('_index.html', 'index.html');
    }
});

module.exports = BootmapEfGenerator;
