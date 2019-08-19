// const inquirer = require('inquirer')
const path = require('path')
// const fs = require('fs-extra')
const Creator = require('./Creator')

function getPromptModules() {
    return ['babel'].map((file)=>require(`./promptModules/${file}`))
}

async function create(name) {
    const targetDir = path.resolve(process.cwd(), name || '.' )

    const creator = new Creator(name, targetDir, getPromptModules())

    creator.create();
    
    // await writeFileTree(targetDir, {
    //     'package.json': JSON.stringify(pkg, null, 2)
    // })
}

// const writeFileTree = (dir, files)=>{
//     Object.keys(files).forEach((name) => {
//         const filePath = path.join(dir, name);
//         fs.ensureDirSync(path.dirname(filePath));
//         fs.writeFileSync(filePath, files[name])
//     })
// }

module.exports = create