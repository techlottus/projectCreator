#!/usr/bin/env node

// import
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import shelljs from 'shelljs'
import chalk from 'chalk'

import render from './utils/templates.js'

// obtener las opciones de los templates
const {pathname: root} = new URL('helpers', import.meta.url)
const TEMPLATE_OPTIONS = fs.readdirSync(root);

const QUESTIONS = [
    {
        name: 'template',
        type: 'rawlist',
        message: '¿Cuál es el helper que necesitas?',
        choices: TEMPLATE_OPTIONS
    }
];

const DIR_ACTUAL = process.cwd();
inquirer.prompt(QUESTIONS).then(respuestas => {

    console.log("🚀 ~ file: index.js ~ line 41 ~ inquirer.prompt ~ respuestas", respuestas)
            
    const { template } = respuestas;

    const templatePath = path.join(root, template);
    const pathTarget = path.join(DIR_ACTUAL, template);

    if(!createProject(pathTarget)) return;

    createDirectoriesFilesContent(templatePath, template);

    postProccess(templatePath, pathTarget);
});

function createProject(projectPath) {
    // Comprobar que no existe el directorio
    if(fs.existsSync(projectPath)) {
        console.log(chalk.red('No puedes crear el directorio, ya existe'));
        return false;
    }

    fs.mkdirSync(projectPath);
    return true;
}

function createDirectoriesFilesContent(templatePath, projectName) {
    // console.log('Directory created ......................> ',templatePath);
    const listFileDirectories = fs.readdirSync(templatePath);

    listFileDirectories.forEach( item => {

        // console.log('Item created .............> ',item);
        const originalPath = path.join(templatePath, item);

        const stats = fs.statSync(originalPath);

        const writePath = path.join(DIR_ACTUAL, projectName, item);

        if(stats.isFile()) {
            let contents = fs.readFileSync(originalPath, 'utf-8');
            contents = render(contents, {projectName});
            fs.writeFileSync(writePath, contents, 'utf-8');
            
            // Información adicional
            const CREATE = chalk.green('CREATE ');
            const SIZE = stats['size'];

            console.log(`${CREATE} ${originalPath} (${SIZE} bytes)`);
        } else if(stats.isDirectory()) {
            fs.mkdirSync(writePath);

            createDirectoriesFilesContent(path.join(templatePath, item), path.join(projectName, item));
        }
    })
}

function postProccess(templatePath, targetPath) {
    const isNode = fs.existsSync(path.join(templatePath, 'package.json'));

    if(isNode) {
        shelljs.cd(targetPath);
        console.log(chalk.green(`Instalando las dependencias en ${targetPath}`));

        const result = shelljs.exec('npm install');
        if(result != 0) {
            return false;
        }
    }
}