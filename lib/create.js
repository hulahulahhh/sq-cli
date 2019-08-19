const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')

async function create(name) {
    const targetDir = path.resolve(process.cwd(), name || '.' )

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
        }, {
            name: 'Commit message standard',
            value: 'commit'
        }]
    }

    await inquirer.prompt([presetPrompt, featurePrompt])

    const pkg = {
        name,
        version: '0.1.0',
        private: true,
        devDependencies: {}
    }
    
    await writeFileTree(targetDir, {
        'package.json': JSON.stringify(pkg, null, 2)
    })
}

const writeFileTree = (dir, files)=>{
    Object.keys(files).forEach((name) => {
        const filePath = path.join(dir, name);
        fs.ensureDirSync(path.dirname(filePath));
        fs.writeFileSync(filePath, files[name])
    })

}

module.exports = create