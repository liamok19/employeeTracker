const inquirer = require('inquirer');
const fs = require('fs');

const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password - get from .env file or use default
    password: process.env.DB_PASSWORD || '',
    database: 'movie_db'
    },
    console.log(`Connected to the courses_db database.`)
);

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
                    'Update and employee Role'
                ], 
        }
    ])
        .then(userChoice => {
            switch (userChoice.list){
                case 'View all departments': 
                promptAlldepartments(); //user is directed to this function if they entered.
                break
                case 'View all roles':
                    promptAllroles(); //user is directed to this function if they entered.
                break
                case 'View all employees':
                    promptAllemployees(); //user is directed to this function if they entered.
            } 
        })
};

const promptAlldepartments = (req, res) => {
        db.query(`INSERT INTO movies (movie_name) VALUES (?)`, res.body.movie_name,  (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
        res.json({
            message:'success',
            data: body
        })
        console.log(result);
        })
        console.log(promptAlldepartments);
}
console.log(db.query);

promptEMS();