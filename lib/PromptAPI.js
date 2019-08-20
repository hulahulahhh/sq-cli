module.exports = class PromptAPI {
    constructor(creator) {
        this.creator = creator;
    }

    injectFeature(feature) {
        this.creator.featurePrompt.choices.push(feature);
    }

    onCompleteCallbacks(fn) {
        this.creator.promptCompleteCbs.push(fn)
    }
}