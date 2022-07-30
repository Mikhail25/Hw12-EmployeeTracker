const mysql = require('mysql2');
const inquirer = require("inquirer");
const DB = require('./db/index');

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
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          process.exit(0);
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
    })
}

function viewRoles(){
  DB.findAllRoles()
    .then(([rows]) => {
      console.table(rows);
    }).then(() => menuPrompt());
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
  }).then(() => {
    menuPrompt();
  });
}

function addRole(){
  DB.findAllDepartments().then(([rows]) =>{
    let departments = rows;
    const departmentChoices = departments.map(({id, name}) => { 
      return {name, value: id}
    });

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the name of the role?',
        },
        {
          type: 'number',
          name: 'salary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Which department does the role belong to?',
          choices: departmentChoices,
        },
      ])
      .then((prompt) => {
        DB.createRole(prompt)
        .then(role => {

          if(role){
            console.log('Role Added!');
          }else{
            console.log('Role error');
          }
    
        }).then(() => {
          menuPrompt();

        }).catch((error) => {
            console.log(error);
        });

      }).catch((err) => {
        
        console.error(err);
      });
  });

 
}

function addEmployee(){
  DB.findAllRoles().then(([rows]) =>{
    let roles = rows;

    const roleChoices = roles.map(({id, title}) => { 
      let name = title;
      return {name, value: id}
    });

    DB.findAllEmployees().then(([rows]) =>{
      let manager = rows;

      const managerChoices = manager.map(({id, first_name, last_name}) =>{
        let name = first_name+" "+last_name;
        return {name, value: id}
      });

      managerChoices.push({name: "None", value: null});

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?",
        },
        {
          type: 'list',
          name: 'department_id',
          message: "What is the employee's role",
          choices: roleChoices,
        },
        {
          type: 'list',
          name: 'manager_id',
          message: "Who is the employee's manager?",
          choices: managerChoices,
        },
      ]).then(prompt => {
        DB.createEmployee(prompt)
        .then(employee => {
          if (employee){
            console.log("Employee Added!");
          }else{
            console.log("Employee Error!");
          }
        })
        .then(() => {
          menuPrompt();
        });
      });
    });
  });

}

function updateEmployeeRole(){
  DB.findAllRoles().then(([rows]) =>{
    let roles = rows;

    const roleChoices = roles.map(({id, title}) => { 
      let name = title;
      return {name, value: id}
    });

    DB.findAllEmployees().then(([rows]) =>{
      let employee = rows;

      const employeeChoices = employee.map(({id, first_name, last_name}) =>{
        let name = first_name+" "+last_name;
        return {name, value: id}
      });

      inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: "Which employee's role do you want to update?",
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'role_id',
          message: "Which role do you want to assign the selected employee?",
          choices: roleChoices,
        },
      ]).then((prompt) => {
          DB.changeRole(prompt)
            .then(roleChange => {

            if(roleChange){
              console.log('Role succesfully changed!');
            }else{
              console.log('Unable to change role');
            }
          }).then(() => {
            menuPrompt();
        });
      });
    });
  });
}

menuPrompt();