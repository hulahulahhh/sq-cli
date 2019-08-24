// const inquirer = require('inquirer')
const path = require('path')
// const fs = require('fs-extra')
const Creator = require('./Creator')

function getPromptModules() {
    return ['babel', 'eslinter'].map((file)=>require(`./promptModules/${file}`))
}

async function create(name) {
    const targetDir = path.resolve(process.cwd(), name || '.' )

    const creator = new Creator(name, targetDir, getPromptModules())

    creator.create();
}

module.exports = create