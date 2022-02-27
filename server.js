const inquirer = require('inquirer');
const fs = require('fs');
require('dotenv').config();
const connect = require('./db/connect');
const express = require('express');
const mysql = require('mysql2');
const { Console } = require('console');
const { type } = require('express/lib/response');

//port might not be required. Commenting out for exercise
// const PORT = process.env.PORT || 3001;

const promptEMS = async function () {
    console.log(`
    ✨✨✨✨                                                    ✨✨✨✨
    _______  __   __  _______  ___      _______  __   __  _______  _______   
    |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |  
    |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___   
    |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|  
    |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___   
    |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|  
                                
                                    ✨✨✨✨ 
    ______   _______  _______  _______  _______  _______  _______  _______   
    |      | |   _   ||       ||   _   ||  _    ||   _   ||       ||       |  
    |  _    ||  |_|  ||_     _||  |_|  || |_|   ||  |_|  ||  _____||    ___|  
    | | |   ||       |  |   |  |       ||       ||       || |_____ |   |___   
    | |_|   ||       |  |   |  |       ||  _   | |       ||_____  ||    ___|  
    |       ||   _   |  |   |  |   _   || |_|   ||   _   | _____| ||   |___   
    |______| |__| |__|  |___|  |__| |__||_______||__| |__||_______||_______|     
    ✨✨✨✨                                                    ✨✨✨✨
    `)
    
    return inquirer.prompt ([
        //list value so the user can choose between what to add before hitting enter. 
        {
            type: 'list',
            name: 'list',
            message: '(Required) Your 1 stop shop for the EMS; Employer Manager System',
            choices:['View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add a Department', 
                    'Add Role/s', 
                    'Add an employee', 
                    'Update an Employees Role',
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
                case 'Add an employee':
                    await promptAddEmployee();
                break
                case 'Update an Employees Role':
                    await updateEmployeeRole();
                break    
                case 'Exit':
                    process.exit(0);
            } 
            await promptEMS();
                
        })
};

// VIEW all the tables from the database section (Departments, Roles and Employees)
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
//ADD to the EMS section (Departments, Roles and Employees)

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

async function promptAddEmployee() {

    const db = await connect();
    // console.log(db);

    return inquirer.prompt ([ 
        {
            type: 'input',
            message:'(Required) Please enter the First Name of the employee?', 
            name: 'f_name',
        },
        {
            type: 'input',
            message:'(Required) Please enter the Last Name of the employee?', 
            name: 'l_name',
        },
        {
            type: 'input',
            message:'(Required) Please enter the Role ID of the employee?', 
            name: 'roleid',
        },        
        {
            type: 'input',
            message:'(Required) Please enter the Manager responsible for this employee?', 
            name: 'managerid',
        },
        ]).then (answer => {
            db.execute(`INSERT INTO employee (role_id, first_name, last_name, manager_id )
                        VALUES (?, ?, ?, ?)`,[answer.roleid, answer.f_name, answer.l_name, answer.managerid]);

        });
}

// UPDATE Employee section
//1. async function thats been called by a prompt windows().

async function updateEmployeeRole() {
    //2. connect to database.

    const db = await connect();
    // console.log(db);
        // SELECT role_id, first_name, last_name
        // FROM ems_db
        // WHERE 
    //3. inquiry prompt choices of all the current employees in the database.

    return inquirer.prompt ([ 
        {
            type: 'list',
            message:'(Required) Please enter the First Name of the employee?', 
            name: 'choices',
            choices: (promptAllemployees(`SELECT * 
            FROM employee
            JOIN roles ON employee.role_id = roles.id;`)),
        },
    ])
    //4. once use selects what employee to update then an inquireprompt runs through the column fields the user wants to update.
    // return inquirer.prompt ([
    //     type: 'list',

    // ])
    //     // 5. db-execute (UPDATE employee (column_names) (?etc) [answer.type_name]

    .then (answer => {
        db.execute(`UPDATE  
                        employee 
                    SET
                        role_id = roleisUpdate,
                        first_name = f_nameUpdate, 
                        last_name = l_nameUpdate,
                        manager_id = manageridUpdate, 
                    WHERE 
                        
                    (role_id, first_name, last_name, manager_id )
                    VALUES (?, ?, ?, ?)`,[answer.roleidUpdate, answer.f_nameUpdate, answer.l_nameUpdate, answer.manageridUpdate]);

}

promptEMS();






