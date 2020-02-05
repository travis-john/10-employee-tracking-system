INSERT INTO departments(department_name)
VALUES
('SALES'),
('ENGINEERING'),
('FINANCE'),
('LEGAL');

INSERT INTO roles(title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 60000, 1),
('Software Engineer', 120000, 2),
('Lead Software Engineer', 150000, 2),
('Accountant', 125000, 3),
('Lead Accoutant', 150000, 3),
('Lawyer', 150000, 4),
('Legal Team Lead', 180000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 3),
('Kunal', 'Singh', 5, NULL),
('Malia', 'Brown', 6, 5),
('Sarah', 'Lourd', 7, NULL),
('Tom', 'Allen', 8, 7);
