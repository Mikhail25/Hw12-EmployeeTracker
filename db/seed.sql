use company_db;

INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Human Resources'),
    ('Finance'),
    ('Legal'),
    ('Engineering');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000.00, 1),
    ('Salesperson', 80000.00, 1),
    ('Lead Engineer', 150000.00,5),
    ('Software Engineer', 120000.00, 5),
    ('Account Manager', 160000.00, 3),
    ('Accountant', 125000.00, 3),
    ('Legal Team Lead', 250000.00, 4 ),
    ('Lawyer', 190000.00, 4),
    ('HR Manager', 180000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, null),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, null);