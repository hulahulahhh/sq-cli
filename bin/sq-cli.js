#!/usr/bin/env node
const program = require('commander');

program
    .version(require('../package').version)
    .usage('<command> [options]')

program.command('create <app-name>')
    .description('create a new project')
    .option('-d, --default', 'Skip prompts and use default preset')
    .action((name)=>{
        require('../lib/create')(name)
    })

// 解析命令行参数  这一行必须要。。不然解析不了命令行参数，会导致注册的命令的回调执行不了。
program.parse(process.argv)
    