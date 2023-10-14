const express = require('express');
const fs = require('fs');
const inq = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
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
    host: '127.0.0.1',
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
  ])
  .then(({choice})=>{
console.log(choice)
  switch (choice) {
    case 'View All Employees':
      db.query('SELECT * FROM employee', function(err,results){
      console.log (results);
        showDb();
      });
      break;
    case 'Add an Employee':
      inq.prompt([
        {
          type: 'input',
          name: 'fName',
          message: 'what is the employees first name?'
        },
        {
          type: 'input',
          name: 'lName',
          message: 'what is the employees last name?'
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'what is the employees role ID?',
          choices: ['101','201','301','401']
        },
        {
          type: 'list',
          name: 'manID',
          message: 'what is the manager ID of the new employee?',
          choices: ['1','2','3','4']
        }
      ]).then((answers)=>{
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,[answers.fName, answers.lName, answers.roleId, answers.manID], function (err, results){
          if (err) throw err;
          if (results.affectedRows>0){
            console.log(`${answers.fName} was successfully added`);
            showDb();
          } else {
            console.log("No changes were made to the database");
            showDb();
          }
        })
        
      }).catch((err)=>{
        console.error(err);
      })
      break;
    case 'Update Employee Role':
      console.log('Updated employee role');
      showDb();
      break;
    case 'View all Roles':
      db.query('SELECT * FROM job', function(err,results){
        console.log(results);
        showDb()
      });
      break;
    case 'Add Role':
      console.log('Added a role');
      showDb();
      break;
    case 'View all Departments':
      db.query('SELECT * FROM department', function(err,results){
        console.log(results);
        showDb()
      });
      break;
    case 'Add Department':
      console.log('Added a department');
      showDb();
      break;
  }

  
});

  }

showDb();
