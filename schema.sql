DROP DATABASE IF EXISTS ems_db;

CREATE DATABASE ems_db;

USE ems_db;

CREATE TABLE department(
    d_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);


CREATE TABLE role(
    r_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (8,2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(d_id)
);


CREATE TABLE employee(
    e_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(r_id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(e_id)
);


SELECT*FROM department;

SELECT*FROM rolee;

SELECT*FROM employee;
