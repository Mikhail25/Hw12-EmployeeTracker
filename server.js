const mysql = require('mysql2');
const inquirer = require("inquirer");
const DB = require('./db/index')

const PORT = process.env.PORT || 3001;

 


// Connect to database


function menuPrompt(){
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
      },
    ])
    .then((prompt) => {
      switch (prompt.menuChoice){
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employe":

          break;
        case "Update Employee Role":

          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":

          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          DB.close();
          break;
      }


    });
}

function viewEmployees(){
  DB.findAllEmployees()
    .then(([rows]) => {
      console.table(rows);
      menuPrompt(); 
    })
}

function viewDepartments(){
  DB.findAllDepartments()
    .then(([rows]) => {
      console.table(rows);
      menuPrompt();
    }).
}

function viewRoles(){
  DB.findAllRoles()
    .then(([rows]) => {
      console.table(rows);
      menuPrompt();
    })
}

function addDepartment(){
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
      validate: (answer) => {
        if (answer !== ""){
          return true;
        }
        return "Please enter at least one name";
      },
    },
  ])
  .then((prompt) => {
    DB.insertDepartment(prompt.name);
  }).then(callback => {
    console.log('Added '+ prompt.name+ 'to the database');
  }).then( "" =>{
    
  } )
}



menuPrompt();