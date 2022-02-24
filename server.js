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
            message: '(Required) Your 1 stop shop for the EMS; Employer Manager System',
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
                case 'Add a Department':
                    await promptAddDepartment();
                break;
                case 'Add a Role':
                    await promptAddRole();
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

    const [results] = await db.execute(`SELECT * from departments `);

    console.table(results);

}
// promptAlldepartments();

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

    await inquirer.prompt ([ 
        {
            type: 'input',
            message:'(Required) Please enter the new Department into the Employment Management System?', 
            name: 'department_title',
        },
        ]);
    // option 1???
    await (answers => {
        db.execute(`INSERT INTO departments (department_name)
                                                VALUES (department_name)`);
            console.info('Answer:', answers.department_title);
        });
    // option 2???
        //     const [results] = await db.execute(`INSERT INTO departments (department_name)
        //                                         VALUES (department_name)`);
        //     console.table(results.department_name);
    // option 3???
        //     const [results] = await db.execute(`INSERT INTO roles (title, salary)
        //                                             VALUES (department_name)`);
        //         console.table(results);
        //     // };
    };

// async function promptAddRole() {
//     const db = await connect();
//     // console.log(db);

//     await inquirer.prompt ([ 
//         {
//             type: 'input',
//             message:'(Required) Please enter the new Role into the Employment Management System?', 
//             name: 'role_title',
//         },
//         {
//             type: 'input',
//             message:'(Required) Please enter the "salary" of the new Role into the Employment Management System?', 
//             name: 'roleSalary',
//         },
//         ]);
//         const [results] = await db.execute(`INSERT INTO roles (title, salary)
//                                             VALUES (role_title, roleSalary)`);
//         console.table(results);
//     // };
// }; console.log(promptAddRole);

promptEMS();