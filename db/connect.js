// Connect to database
const mysql = require('mysql2/promise');

async function connect(){
    return mysql.createConnection(
        {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        port: 3306,
        // MySQL password - get from .env file or use default.
        //added .dn to .gitignore
        password: process.env.DB_PASSWORD || '',
        database: 'ems_db'
        }
    )
    .catch(err => {
        console.log(err)
    });

}
module.exports = connect;
