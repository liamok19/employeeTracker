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
//     //2. connect to database.
//     const empList = [];
//     // console.log(empList);
    const db = await connect();
//     // console.log(db);

    const [employees] = await db.execute(`SELECT * 
                                        FROM employee
                                        JOIN roles ON employee.role_id = roles.id;`
    );

    const [roles] = await db.execute(`SELECT * FROM roles`);

    // dept id

    // role id 
    // 1. show a list of employee names

    // once selected: show all the roles available, regardless of dept
    
    return inquirer.prompt([
        {
            type: "list",
            message: "Select an an employee:",
            name: "employee",
            choices: employees.map((employee) => { 
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                };
            })
                
        },
        
        {
            type: "list",
            message: "Select an an role",
            name: "role",
            choices: roles.map((role) => { 
                return {
                    name: role.title,
                    value: role.id
                };
            })
                
        },
        ]).then((res) => {
            console.log(res);
                //3. perfom the update
            return db.execute("UPDATE employee SET `role_id` = ? WHERE (`id` = ?)", [res.role, res.employee]);

        })
    //3. inquiry prompt choices of all the current employees in the database.

    //4. once use selects what employee to update then an inquireprompt runs through the column fields the user wants to update.

    //5. db-execute (UPDATE employee (column_names) (?etc) [answer.type_name]

};


promptEMS();




