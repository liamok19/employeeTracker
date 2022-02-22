use ems_db;

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE employee;
TRUNCATE roles;
TRUNCATE departments;
SET FOREIGN_KEY_CHECKS=1;

INSERT INTO departments (department_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO roles (department_id, title, salary)
VALUES  (1, "Salesperson", 6565.12),
        (2, "Lead Engineer", 7575.12),
        (2, "Software Engineer", 1515.12),
        (3, "Account Manager", 8585.99),
        (3, "Accountant", 999.99 ),
        (4, "Legal Team Lead", 2.99),
        (4, "Lawyer", 1.99);
        
INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, "Mike", "Chan", NULL),
        (2, "Ashley", "Rodriguez", NULL),
        (3, "Kevin", "Tupik", 2),
        (4, "Kunal", "Singh", NULL),
        (5, "Malia", "Brown", 4),
        (6, "Sarah", "Lourd", NULL),
        (7, "Tom", "Allen", 6);