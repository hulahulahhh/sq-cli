const EventEmitter = require("events");
const inquirer = require('inquirer');
const PromptAPI = require('./PromptAPI')

// const isManualMode = (answers) => answers.preset === '_manual_'

module.exports = class Creator extends EventEmitter {
  constructor(name, context, promptModules) {
    // 一定要有super吗
    super();

    this.name = name;
    this.context = context;
    
    const {presetPrompt, featurePrompt} = this.resolveIntroPrompt();
    this.presetPrompt = presetPrompt;
    this.featurePrompt = featurePrompt;

    const promptApi = new PromptAPI(this);
    promptModules.forEach((module)=>module(promptApi))
  }

  create() {
    inquirer.prompt([this.presetPrompt, this.featurePrompt])
  }

  resolveIntroPrompt() {
    let presetPrompt = {
        name: 'preset',
        type: 'list',
        message: 'please pick a project setting. default, preset or manually?',
        choices: [{
            name: 'manually select',
            value: '_manual_'
        }]
    }

    let featurePrompt = {
        name: 'feature',
        type: 'checkbox',
        message: 'check the needed feature for your project',
        choices: []
    }

    return { presetPrompt, featurePrompt }
}
};
