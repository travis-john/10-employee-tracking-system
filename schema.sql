DROP DATABASE IF EXISTS ems_db;

CREATE DATABASE ems_db;

USE ems_db;

CREATE TABLE departments(
    d_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);


CREATE TABLE roles(
    r_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (8,2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(d_id)
);


CREATE TABLE employees(
    e_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(r_id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(e_id)
);


SELECT*FROM departments;

SELECT*FROM roles;

SELECT*FROM employees;
