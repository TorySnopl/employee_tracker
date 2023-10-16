--test queries before coding into server.js file--

SELECT *
FROM employee;


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('');


UPDATE employee
SET role_id = new_role_id
WHERE id = employee_id;


SELECT *
FROM job;


INSERT INTO job (id,r_title,salary,department_id)
VALUES ('');

SELECT *
FROM department;


INSERT INTO department (id,d_name)
Values('');
