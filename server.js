const express = require('express');
const fs = require('fs');
const inq = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3306;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'timberswin',
    database: 'employees_db'
  },
  console.log(`Connected to the employees database.`)
);

db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err);
    } else {
      console.log('Connected to the employees database.');
    }
  });



  async function showDb() {
  const userChoice = await inq.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add an Employee',
        'Update Employee Role',
        'View all Roles',
        'Add Role',
        'View all Departments',
        'Add Department',
      ],
      name: 'choice',
    },
  ]);

  switch (userChoice.choice) {
    case 'View All Employees':
      if (db.state === 'Authenticated'){
      db.query('SELECT * FROM employee', function(err,results){
        if (err){
          console.error('Error: '+err);
        } else {
          console.log (results);
        }
        showDb();
      });
    } else {
      console.error('Database connection is not good');
    }
      break;
    case 'Add an Employee':
      console.log('Added an employee');
      showDb();
      break;
    case 'Update Employee Role':
      console.log('Updated employee role');
      showDb();
      break;
    case 'View all Roles':
      console.log('Viewed all roles');
      showDb();
      break;
    case 'Add Role':
      console.log('Added a role');
      showDb();
      break;
    case 'View all Departments':
      console.log('Viewed all departments');
      showDb();
      break;
    case 'Add Department':
      console.log('Added a department');
      showDb();
      break;
  }

  
}

showDb();
