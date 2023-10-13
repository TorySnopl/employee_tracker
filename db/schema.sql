DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  d_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE job (
  id INT NOT NULL   AUTO_INCREMENT,
  r_title VARCHAR(30),
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL   AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
   );
