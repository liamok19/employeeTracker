const inquirer = require('inquirer');
const fs = require('fs');
require('dotenv').config();
const connect = require('./db/connect');
const express = require('express');
const mysql = require('mysql2');

//port might not be required. Commenting out for exercise
// const PORT = process.env.PORT || 3001;




const promptEMS = function () {
    return inquirer.prompt ([
        //list value so the user can choose between what to add before hitting enter. 
        {
            type: 'list',
            name: 'list',
            message: '(Required) Your 1 stop shop for the EMS; Emplyer Manager System',
            choices: ['View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add a Department', 
                    'Add a role', 
                    'Add an employee', 
                    'Update and employee Role',
                    'Exit',
                ], 
        }
    ])
        .then(async (userChoice) => {
            switch (userChoice.list){
                case 'View all departments': 
                    await promptAlldepartments(); //user is directed to this function if they entered.
                break
                case 'View all roles':
                    await promptAllroles(); //user is directed to this function if they entered.
                break
                case 'View all employees':
                    await promptAllemployees(); //user is directed to this function if they entered.
                    break;
                case 'Exit'    :
                    process.exit(0);
            } 
            await promptEMS();
                
        })
};

async function promptAlldepartments () {

    const db = await connect();
    // console.log(db);

    const [results] = await db.execute(`SELECT * from departments`);

    console.table(results);

}
// promptAlldepartments();

async function promptAllroles () {

    const db = await connect();
    // console.log(db);

    const [results] = await db.execute(`SELECT * from roles`);

    console.table(results);

}async function promptAllemployees () {

    const db = await connect();
    // console.log(db);

    const [results] = await db.execute(`SELECT * from employee`);

    console.table(results);

}


promptEMS();