DROP DATABASE IF EXISTS ems_db;

CREATE DATABASE ems_db;

USE ems_db;

CREATE TABLE department(
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);


CREATE TABLE rolee(
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL (8,2) NOT NULL,
    department_id INT,
    -- which variable do you want to make FK then reference primary key of a particular table
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);


CREATE TABLE employee(
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);


SELECT*FROM department;

SELECT*FROM rolee;

SELECT*FROM employee;
