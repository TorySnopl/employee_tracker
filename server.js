const express = require('express');
const fs = require('fs');
const inq = require('inquirer');
const mysql = require('mysql2');
const cFont = require('cfonts');

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

//cfonts NPM to create opening graphic
cFont.say("Employee|Tracker",{
  font: 'block',
  align: 'left',
  letterSpacing: 0.90,
  background: 'transparent',
  env: 'node'
})

// showDB Function to run appropriate query based on inq input
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
        'Exit'
      ],
      name: 'choice',
    },
  ])
  .then(({choice})=>{
console.log(choice)
  switch (choice) {
    case 'View All Employees':
      db.query('SELECT * FROM employee', function(err,results){
      console.table (results);
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

    db.query(`SELECT id, first_name, last_name FROM employee`, function (err,results){
      if (err) throw err;

      if (results.length>0) {
        const employeeChoice = results.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }));
      
    
      inq.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Choose an employee you would you like to update',
          choices: employeeChoice
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'What is the new Role ID for the employee?'
        }
      ]).then((answers)=>{
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,[answers.newRoleId, answers.employeeId], function (err, updateResults){
          if (err) throw err;
          if (updateResults.affectedRows>0){
            console.log(`${answers.first_name} role was successfully updated with new ID: ${answers.newRoleId}`);
            showDb();
          } else {
            console.log("No changes were made to the database");
            showDb();
          }
        })
      }).catch((err)=>{
        console.error(err);
      });
    
    }
  });
      break;

    case 'View all Roles':
      db.query('SELECT * FROM job', function(err,results){
        console.table(results);
        showDb()
      });
      break;

    case 'Add Role':
      inq.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'what is the title of the new role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'what is the salary for this role?'
        },
        {
          type: 'list',
          name: 'deptID',
          message: 'what is the department ID of the new role?',
          choices: ['001','002','003','004']
        }
      ]).then((answers)=>{
        db.query(`INSERT INTO job (r_title, salary, department_id) VALUES (?,?,?)`,[answers.title, answers.salary, answers.deptID], function (err, results){
          if (err) throw err;
          if (results.affectedRows>0){
            console.log(`${answers.title} was successfully added`);
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
    
    case 'View all Departments':
      db.query('SELECT * FROM department', function(err,results){
        console.table(results);
        showDb()
      });
      break;

    case 'Add Department':
      inq.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'what is the name of the new department?'
        }
      ]).then((answers)=>{
        db.query(`INSERT INTO department (d_name) VALUES (?)`,[answers.title], function (err, results){
          if (err) throw err;
          if (results.affectedRows>0){
            console.log(`${answers.title} was successfully added`);
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

      case 'Exit':
        console.log("Exiting the program, Goodbye!");
        process.exit();
        

        default:
          console.log('Invalid choice. Please choose a valid option.');
          showDb();
          break;
          
  }
})

}

//initiates showDB function
showDb()
