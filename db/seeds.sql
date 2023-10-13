INSERT INTO department (id, d_name) VALUES
(001, 'HR'),
(002, 'Engineering'),
(003, 'Marketing'),
(004, 'Sales');


INSERT INTO job (id, r_title, salary, department_id) VALUES
(101, 'HR Manager', 60000.00, 001),
(201, 'Software Engineer', 80000.00, 002),
(301, 'Marketing Specialist', 55000.00, 003),
(401, 'Sales Representative', 60000.00, 004);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(567, 'John', 'Doe', 101, 1),
(890, 'Jane', 'Smith', 201, 2),
(456, 'Alice', 'Johnson', 301, 3),
(345, 'Bob', 'Williams', 401, 4),
(234, 'David', 'Brown', 201, 2),
(123, 'Ella', 'Davis', 401, 4),
(789, 'Frank', 'Taylor', 201, 2);