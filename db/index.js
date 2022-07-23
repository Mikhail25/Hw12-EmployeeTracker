const connection = require('./connection');

class DB{
    constructor(connection){
        this.connection = connection;

    }

    findAllDepartments(){
        return this.connection.promise().query(`SELECT department.id, department.name
        FROM department`);
    }

    findAllRoles(){
        return this.connection.promise().query(`SELECT role.id, role.title, role.salary, department.name
        FROM role
        LEFT JOIN department ON role.department_id = department.id`);
    }

    findAllEmployees(){
        return this.connection.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, 
        department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee 
        LEFT JOIN role on employee.role_id = role.id 
        LEFT JOIN department on role.department_id = department.id 
        LEFT JOIN employee manager on manager.id = employee.manager_id;`);
    }

    insertDepartment(params){
        const sql = `INSERT INTO department (name)
        VALUES (?)`;

        return this.connection.promise().query(sql, params);
        }
}

module.exports = new DB(connection);