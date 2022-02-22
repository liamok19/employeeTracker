SELECT *
FROM departments
JOIN roles ON roles.department_id = departments.id;

SELECT *
FROM employee
JOIN roles ON employee.role_id = roles.id;

SELECT *
FROM employee
JOIN employee ON employee.manager_id = employee.id;