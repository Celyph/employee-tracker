const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('table');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'challenge12'
});

connection.execute(
    'CREATE TABLE IF NOT EXISTS department (id INT PRIMARY KEY, name VARCHAR(30))'
);
connection.execute(
    'CREATE TABLE IF NOT EXISTS role (id INT PRIMARY KEY, title VARCHAR(30), salary DECIMAL, department_id INT)'
);
connection.execute(
    'CREATE TABLE IF NOT EXISTS employee (id INT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT)'
);

const makeTable = (data) => {
    const firstRow = Object.keys(data[0]);
    const rows = data.map(Object.values);
    rows.unshift(firstRow);
    return table.table(rows);
}

const viewAllDepartments = () => {
    connection.query(
        'SELECT * FROM department',
        function(err, results) {
            console.log(makeTable(results));
        }
    )
}

const viewAllRoles = () => {
    connection.query(
        'SELECT * FROM role',
        function(err, results) {
            console.log(makeTable(results));
        }
    )
}

const viewAllEmployees = () => {
    connection.query(
        'SELECT * FROM employee',
        function(err, results) {
            console.log(makeTable(results));
        }
    )
}


inquirer
    .prompt([
    { name: 'option', message: 'What would you like to do?', type: 'list', choices: ['View all departments', 'View all roles', 'View all employees'] }
    ])
    .then((answer) => {
        if (answer.option === 'View all departments') {
            viewAllDepartments();
        } else if (answer.option === 'View all roles') {
            viewAllRoles();
        } else {
            viewAllEmployees();
        }
    })