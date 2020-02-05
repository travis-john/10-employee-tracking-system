INSERT INTO departments(d_id, department_name)
VALUES
(1, 'SALES'),
(2, 'ENGINEERING'),
(3, 'FINANCE'),
(4, 'LEGAL');

INSERT INTO roles(r_id, title, salary, department_id)
VALUES
(1, 'Sales Lead', 100000, 1),
(2, 'Salesperson', 60000, 1),
(3, 'Software Engineer', 120000, 2),
(4, 'Lead Software Engineer', 150000, 2),
(5, 'Accountant', 125000, 3),
(6, 'Lead Accoutant', 150000, 3),
(7, 'Lawyer', 150000, 4),
(8, 'Legal Team Lead', 180000, 4);

INSERT INTO employees(e_id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Mike', 'Chan', 2, 1),
(3, 'Ashley', 'Rodriguez', 4, NULL),
(4, 'Kevin', 'Tupik', 3, 3),
(5, 'Malia', 'Brown', 5, 6),
(6, 'Kevin', 'Malone',6, NULL ),
(7, 'Sarah', 'Lourd', 8, NULL),
(8, 'Tom', 'Allen', 7, 7 );
