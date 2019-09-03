const EventEmitter = require("events");
const inquirer = require("inquirer");
const PromptAPI = require("./PromptAPI");
const fs = require("fs-extra");
const path = require("path");

// const isManualMode = (answers) => answers.preset === '_manual_'

module.exports = class Creator extends EventEmitter {
  constructor(name, context, promptModules) {
    // 一定要有super吗
    super();

    this.name = name;
    this.context = context;

    const { presetPrompt, featurePrompt } = this.resolveIntroPrompt();
    this.presetPrompt = presetPrompt;
    this.featurePrompt = featurePrompt;
    this.injectedPrompts = []
    this.promptCompleteCbs = []

    const promptApi = new PromptAPI(this);
    promptModules.forEach(module => module(promptApi));
  }

  async create() {
    const { context, name } = this;

    console.log(this.injectedPrompts);

    const answers = await inquirer.prompt([
      this.presetPrompt,
      this.featurePrompt,
      ...this.injectedPrompts
    ]);

    console.log(answers.features);
    

    let preset = {};
    if (answers.preset && answers.preset !== "_manual_") {
      console.log("todo");
    } else {
      preset = {
        useConfigFiles: answers.useConfigFiles === "files",
        plugins: {}
      };
      answers.features = answers.features || [];
      // run cb registered by prompt modules to finalize the preset
      this.promptCompleteCbs.forEach(cb => cb(answers, preset));
    }

    let pkg = {
      name,
      version: "0.1.0",
      devDependencies: {}
    };

    await this.writeFileTree(context, {
      "package.json": JSON.stringify(pkg, null, 2)
    });
  }

  resolveIntroPrompt() {
    let presetPrompt = {
      name: "preset",
      type: "list",
      message: "please pick a project setting. default, preset or manually?",
      choices: [
        {
          name: "manually select",
          value: "_manual_"
        }
      ]
    };

    let featurePrompt = {
      name: "features",
      type: "checkbox",
      message: "check the needed feature for your project",
      choices: []
    };

    return { presetPrompt, featurePrompt };
  }
  writeFileTree(dir, files) {
    Object.keys(files).forEach(name => {
      const filePath = path.join(dir, name);
      fs.ensureDirSync(path.dirname(filePath));
      fs.writeFileSync(filePath, files[name]);
    });
  }
};
