#!/usr/bin/env node

// import
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import shelljs from 'shelljs'
import chalk from 'chalk'

import dotenv from 'dotenv'

import render from './utils/templates.js'

import callApi from './microsoft/fetch.js'
import callApiProjects from './devops/getProjects.js'
import getToken from './microsoft/auth.js'
import { log } from 'console'

/**
 * With client credentials flows permissions need to be granted in the portal by a tenant administrator.
 * The scope is always in the format '<resource-appId-uri>/.default'. For more, visit: 
 * https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow 
 */
 const tokenRequest = {
	scopes: ['https://graph.microsoft.com/.default'], // e.g. 'https://graph.microsoft.com/.default'
};

const apiConfig = {
	uri: 'https://graph.microsoft.com/v1.0/me', // e.g. 'https://graph.microsoft.com/v1.0/users'
};

let canCreateProject = false;

// obtener las opciones de los templates
const {pathname: root} = new URL('templates', import.meta.url)
const TEMPLATE_OPTIONS = fs.readdirSync(root);

dotenv.config()

const QUESTIONS_LOGIN = [
    {
        name: 'email',
        type: 'input',
        message: 'Ingresa tu correo institucional',
        validate: function(input) {
            if(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(input)) {
                return true;
            }
            return 'Ingresa un correo valido...'
        }
    },
    {
        name: 'password',
        type: 'password',
        message: 'Ingresa tu contraseña'
    }
];

const QUESTIONS = [
    {
        name: 'template',
        type: 'rawlist',
        message: '¿Qué tipo de proyecto requieres generar?',
        choices: TEMPLATE_OPTIONS
    },
    {
        name: 'proyecto',
        type: 'input',
        message: '¿Cuál es el nombre del proyecto?',
        validate: function(input) {
            if(/^([a-z@]{1}[a-z\-\.\\\/0-9]{0,213})+$/.test(input)){
                return true;
            }

            return 'El nombre del proyecto no coincide con las caracteristicas apropiadas.';
        }
    }
];

const QUESTIONS_PROJECTS = [
    {
        name: 'template',
        type: 'rawlist',
        message: '¿En qué proyecto participas?',
        choices: projects
    }
];

const DIR_ACTUAL = process.cwd();
inquirer.prompt(QUESTIONS_LOGIN).then(async conf => {
    try {
        const usernamePasswordRequest = {
            scopes: ["user.read"],
            username: conf.email,
            password: conf.password
        }
        const authResponse = await getToken(tokenRequest, usernamePasswordRequest);
        //console.log("authResponse --> ", authResponse);
        const users = await callApi(apiConfig.uri, authResponse.accessToken);
        
        const projects = await callApiProjects();
        console.log("PROJECTS ------> ", projects);
        
        canCreateProject = true;
    } catch (error) {
        if(error.errorCode === 'invalid_grant')
            console.log('Correo y/o password incorrectos...', error);
        else
            console.log(error);
    }
    
    if( canCreateProject ) {
        inquirer.prompt(QUESTIONS_PROJECTS).then(respProj => {
            console.log("🚀 ~ Realiza tu mejor esfuerzo")
        })
        inquirer.prompt(QUESTIONS).then(respuestas => {

            console.log("🚀 ~ file: index.js ~ line 41 ~ inquirer.prompt ~ respuestas", respuestas)
            
            const { template, proyecto } = respuestas;

            const templatePath = path.join(root, template);
            const pathTarget = path.join(DIR_ACTUAL, proyecto);

            if(!createProject(pathTarget)) return;

            createDirectoriesFilesContent(templatePath, proyecto);

            postProccess(templatePath, pathTarget);
        });
    } else {
        console.log(chalk.red('Adios'));
        return;
    }
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