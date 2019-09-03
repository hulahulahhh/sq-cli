module.exports = class PromptAPI {
  constructor(creator) {
    this.creator = creator;
  }

  injectFeature(feature) {
    this.creator.featurePrompt.choices.push(feature);
  }

  onPromptComplete(fn) {
    this.creator.promptCompleteCbs.push(fn);
  }

  injectPrompt(prompt) {
    this.creator.injectedPrompts.push(prompt);
  }

  injectOptionForPrompt(name, option) {
    this.creator.injectedPrompts
      .find(f => {
        return f.name === name;
      })
      .choices.push(option);
  }
};
