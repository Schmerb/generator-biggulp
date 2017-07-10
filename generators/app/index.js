'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.bgBlack(
        chalk.yellow('Welcome to\n') +
        chalk.green('Hill Holliday\'s\n') +
        chalk.red('Frontend\n') +
        chalk.green('generator!\n') +
        chalk.cyan('WARNING: USE NODE V4.8.*')
      )
    ));

    this.log(chalk.bgBlack(
      chalk.green('\n\n' +
      '    ____          _  __                    __        __       \n' +
      '   / __ ) ____   (_)/ /___   _____ ____   / /____ _ / /_ ___  \n' +
      '  / __  |/ __ \\ / // // _ \\ / ___// __ \\ / // __ `// __// _ \\ \n' +
      ' / /_/ // /_/ // // //  __// /   / /_/ // // /_/ // /_ /  __/ \n' +
      '/_____/ \\____//_//_/ \\___//_/   / .___//_/ \\__,_/ \\__/ \\___/  \n') +
      chalk.cyan(
      'for creating static sites using compass, scss, bourbon,\n' +
      'jquery, grunt and html5 goodness.'
      ) +
      '\n\n'
    ));

    const prompts = [{
      type: 'input',
      name: 'name.internal',
      message: chalk.green('What\'s the ' + chalk.cyan('INTERNAL') + ' name of the project?'),
      default: 'ethnography'
    }, {
      type: 'input',
      name: 'name.external',
      message: chalk.green('What\'s the ' + chalk.red('EXTERNAL') + ' name of the project?'),
      default: 'Frankly'
    }, {
      type: 'confirm',
      name: 'local.assets',
      message: chalk.green('Will this project contain locally stored assets?'),
      default: false
    }, {
      type: 'confirm',
      name: 'local.db',
      message: chalk.green('Will this project contain locally stored database?'),
      default: false
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.name;
      this.props = props;
      this.props.name.folderName = props.name.internal.toLowerCase().replace(/\s/g, '-');
    });
  }

  writing() {
    let projectPath = './' + this.props.name.folderName;
    this.fs.copyTpl(
      this.templatePath('**/**'),
      this.destinationPath(projectPath),
      {
        title: this.props.name,
        yield: '<%- yield %>',
        name: {
          internal: this.props.name.internal,
          external: this.props.name.external,
          project: this.props.name.internal
        },
        local: {
          assets: this.props.local.assets,
          db: this.props.local.db
        }
      }
    );
    this.fs.copy(
      this.templatePath('**/.**'),
      this.destinationPath(projectPath)
    );
  }

  install() {
    // Should be something like this.spawnCommandSync('cd',[this.props.name], { cwd: ''});
    process.chdir(this.props.name.folderName);

    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', '"Yeoman initial commit"', '--quiet']);
    this.log('I also made your initial commit for you!');
    this.installDependencies({
      bower: false,
      npm: true
    });
  }
};
