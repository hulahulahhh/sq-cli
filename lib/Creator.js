const EventEmitter = require("events");
const inquirer = require('inquirer');
const PromptAPI = require('./PromptAPI')
const fs = require('fs-extra');
const path = require('path')

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

  async create() {
    const {context, name} = this

    await inquirer.prompt([this.presetPrompt, this.featurePrompt])

    let pkg = {
      name,
      version: '0.1.0',
      devDependencies: {}
    }

    await this.writeFileTree(context, {
        'package.json': JSON.stringify(pkg, null, 2)
    })
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
 writeFileTree(dir, files){
    Object.keys(files).forEach((name) => {
        const filePath = path.join(dir, name);
        fs.ensureDirSync(path.dirname(filePath));
        fs.writeFileSync(filePath, files[name])
    })
}
};
