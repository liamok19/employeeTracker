const inquirer = require('inquirer');
const fs = require('fs');

const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // Connect to database
// const db = mysql.createConnection(
//     {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password - get from .env file or use default
//     password: process.env.DB_PASSWORD || '',
//     database: 'movie_db'
//     },
//     console.log(`Connected to the courses_db database.`)
// );
