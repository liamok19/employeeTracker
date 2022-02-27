const inquirer = require('inquirer');
const fs = require('fs');
require('dotenv').config();
const connect = require('./db/connect');
const express = require('express');
const mysql = require('mysql2');
const { Console } = require('console');

//port might not be required. Commenting out for exercise
// const PORT = process.env.PORT || 3001;

const promptEMS = async function () {
    return inquirer.prompt ([
        //list value so the user can choose between what to add before hitting enter. 
        {
            type: 'list',
            name: 'list',
            message: '(Required) Your 1 stop shop for the EMS; Employer Manager System',
            choices: ['View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add a Department', 
                    'Add Role/s', 
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
                break
                case 'Add a Department':
                    await promptAddDepartment();
                break
                case 'Add Role/s':
                    await promptaddRoles();
                break
                case 'Add an employee':
                    await promptAddEmployee();
                break
                case 'Exit':
                    process.exit(0);
            } 
            await promptEMS();
                
        })
};


async function promptAlldepartments () {

    const db = await connect();
    // console.log(db);

    const [results] = await db.execute(`SELECT * from departments `);

    console.table(results);

}

async function promptAllroles () {

    const db = await connect();
    // console.log(db);

    const [results] = await db.execute(`SELECT * from roles`);

    console.table(results);

}

async function promptAllemployees () {

    const db = await connect();
    // console.log(db);

    const [results] = await db.execute(`SELECT * 
                                        FROM employee
                                        JOIN roles ON employee.role_id = roles.id;`
    );

    console.table(results);

}

async function promptAddDepartment() {
    const db = await connect();
        // console.log(db);
    return inquirer.prompt ([ 
        {
            type: 'input',
            message:'(Required) Please enter the new Department into the EMS?', 
            name: 'department_title',
        },
        ]).then((answer)=>{
            // console.log(answer);
            // console.log(answer.department_title);
                    // let department = answer.department_title;
                    // console.log(department);
                    db.execute(`INSERT INTO departments (department_name)
                                                            VALUES (?)`,[answer.department_title]);
                        console.info('Answer:', answer.department_title);
                        console.log(promptAddDepartment);

                    });
}

async function promptaddRoles() {

    const db = await connect();
    // console.log(db);

    return inquirer.prompt ([ 
        {
            type: 'input',
            message:'(Required) Please enter the new Role into the EMS?', 
            name: 'title',
        },
        {
            type: 'input',
            message:'(Required) Please enter the "salary" of the new Role into the EMS?', 
            name: 'salary',
        },
        {
            type: 'input',
            message:'(Required) Please enter the department ID of the new Role into the EMS?', 
            name: 'id',
        },
        ]).then (answer => {
            // console.log(answer);
            // let roletitle = answer.title;
            // console.log(roletitle);
            // let roleSalary = answer.salary;
            // let department_id = answer.id
            // console.log(roleSalary);
            db.execute(`INSERT INTO roles (title, salary, department_id)
                        VALUES (?, ?, ?)`,[answer.title, answer.salary, answer.id]);
                // console.info('Answer:', answer.title, answer.salary);
            // console.log(db);

        });
}

promptEMS();






