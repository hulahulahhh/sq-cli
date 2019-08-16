const inquirer = require('inquirer')

async function create(name) {
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
        choices: [{
            name: 'Babel',
            value: 'babel'
        }, {
            name: 'Lint',
            value: 'lint'
        }]
    }

    inquirer.prompt([presetPrompt, featurePrompt])

}

module.exports = create