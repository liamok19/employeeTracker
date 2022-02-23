USE ems_db;

SELECT *
FROM departments
JOIN roles ON roles.department_id = departments.id;

SELECT roles.department_id, roles.title, roles.salary
FROM employee
JOIN roles ON employee.role_id = roles.id;

SELECT *
FROM employee
JOIN roles ON employee.role_id = roles.id;

-- SELECT *
-- FROM employee
-- JOIN employee ON employee.manager_id = employee.id;
