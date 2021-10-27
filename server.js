const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const env = require("dotenv").config();
const cTable = require("console.table");
const util = require("util");

const employee = require("./lib/Employee");
const role = require("./lib/Role");
const department = require("./lib/Department");
const { json } = require("express");

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
    password: "",
    database: "empTrack_db",
  },
  console.log(`Connected to the empTrack_db database.`)
);

db.query = util.promisify(db.query);

// test departments
// let departments = [];
// db.query(`SELECT name FROM department;`, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     // departments = result;
//     console.log(result);
//   }
// });

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
          db.query(
            `SELECT role.title, role.department_id AS id, department.name AS department FROM role 
          INNER JOIN department ON role.department_id = department.id`,
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
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          db.query(`SELECT * FROM department`, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.table(result);
            }
            start();
          });
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

// add role questions
async function addRole() {
  const departments = await db.query(`SELECT name, id FROM department`);
  // console.log(departments);
  const { role, salary, department } = await inquirer.prompt([
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
      choices: departments.map((row) => ({ name: row.name, value: row.id })),
    },
  ]);

  db.query(
    `INSERT INTO role (title, salary, department_id) VALUES ('${role}', ${salary}, ${department})`,

    function (err, res) {
      if (err) throw err;
      console.log(`\nAdded ${role} to the database\n`);
      start();
    }
  );
}

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
            start();
          }
        }
      );
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

async function addEmployee() {
  const roles = await db.query(`SELECT title, id FROM role`);
  // const managers = await db.query(
  //   `SELECT first_name, last_name, id FROM employee`
  // );
  // console.log(departments);
  const { first_name, last_name, role } = await inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: roles.map((row) => ({ name: row.title, value: row.id })),
    },
  ]);

  db.query(
    `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${first_name}', '${last_name}', ${role})`,

    function (err, res) {
      if (err) throw err;
      console.log(`\nAdded ${first_name} ${last_name} to the database\n`);
      start();
    }
  );
}

async function updateEmployeeRole() {
  const employees = await db.query(`SELECT first_name, id FROM employee`);
  const roles = await db.query(`SELECT title, id FROM role`);
  // const managers = await db.query(
  //   `SELECT first_name, last_name, id FROM employee`
  // );
  // console.log(departments);
  const { first_name, role } = await inquirer.prompt([
    {
      name: "first_name",
      type: "list",
      message: "What is the employee's name?",
      choices: employees.map((row) => ({
        name: row.first_name,
        value: row.id,
      })),
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's new role?",
      choices: roles.map((row) => ({ name: row.title, value: row.id })),
    },
  ]);

  db.query(
    `UPDATE Employee SET role_id = ${role} WHERE id = ${first_name}`,
    // `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${first_name}', '${last_name}', ${role})`,

    function (err, res) {
      if (err) throw err;
      console.log(`\Updated ${first_name} in the database\n`);
      start();
    }
  );
}
