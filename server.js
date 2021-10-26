/*PSUEDO coding START

What would you like to do?
  View All Employees
  Add Employee
  Update Employee Role
  View All Roles
  Add Role
  View All Departments
  Add Department
  (More up and down to reveal more choices)

Add Role
  What is the name of the role?

 

PSUEDO codind END*/

const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const cTable = require("console.table");

const employee = require("./lib/Employee");
const role = require("./lib/Role");
const department = require("./lib/Department");

// 'process.env.PORT' was added for production environments
const PORT = process.env.PORT || 3001;
const app = express();

// TODO: Implement middleware for the parsing of JSON data
// TODO: Implement middleware for parsing of URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "root",
    database: "empTrack_db",
  },
  console.log(`Connected to the classlist_db database.`)
);

// first question
const start = () => {
  inquirer
    .prompt([
      {
        name: "whatToDoSecond",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((answer) => {
      const answer2 = answer.whatToDoSecond;
      switch (answer2) {
        case "View All Employees":
          db.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
            AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) 
            AS manager FROM employee LEFT JOIN role on employee.role_id = role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT JOIN employee manager on manager.id = employee.manager_id;`,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.table(result);
              }
              start();
            }
          );

          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          db.query(`SELECT * FROM role`, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.table(result);
            }
            start();
          });
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          db.query(`SELECT * FROM department`, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`
                `);
              console.table(result);
            }
          });
          start();
          break;
        case "Add Department":
          addDepartment();
          break;
        default:
          console.log(`Something is broken...`);
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log("Something else went wrong");
      }
    });
};
// call first question
start();

// first question
const addRole = () => {
  // make array for department choices

  inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "What is the name of the role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary of the role?",
    },
    {
      name: "department",
      type: "list",
      message: "Which department does the role belong to?",
      choices: [
        // "View All Employees",
        // "Add Employee",
        // "Update Employee Role",
        // "View All Roles",
        // "Add Role",
        // "View All Departments",
        // "Add Department",
      ],
    },
  ]);
  // .then((answer) => {
  //   const newDepartment = new role(answer.department);
  //   db.query(
  //     `INSERT INTO department (name) VALUES ('${answer.department}')`,
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(`Added ${answer.department} to the database`);
  //       }
  //     }
  //   );
  //   start();
  // })
  // .catch((error) => {
  //   if (error.isTtyError) {
  //     console.log("Prompt couldn't be rendered in the current environment");
  //   } else {
  //     console.log("Something else went wrong");
  //     console.log(error);
  //   }
  // });
};

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      const newDepartment = new department(answer.department);
      db.query(
        `INSERT INTO department (name) VALUES ('${answer.department}')`,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Added ${answer.department} to the database`);
          }
        }
      );
      start();
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log("Something else went wrong");
        console.log(error);
      }
    });
}

function addEmployee() {
  console.log("addEmployee() entered");
}

function updateEmployeeRole() {
  console.log("updateEmployeeRole() entered");
}
