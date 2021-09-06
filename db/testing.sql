SELECT CONCAT(emp.first_name, ' ', emp.last_name) as Name,
       CONCAT(mgr.first_name, ' ', mgr.last_name) as Manager
FROM employees AS emp
LEFT JOIN employees AS mgr ON emp.manager_id = mgr.id
WHERE emp.id=1

-- this gets me the total of all role salaries within a department, but I need to know how many employees have each role
SELECT name as Department,
        SUM(roles.salary) AS Budget
FROM departments
LEFT JOIN roles ON departments.id = roles.department_id
GROUP BY departments.id;

SELECT departments.name AS Department,
       SUM(roles.salary) AS Budget
    FROM employees emp
    LEFT JOIN roles
    ON emp.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees mgr
    ON emp.manager_id = mgr.id
    GROUP BY departments.id;


-- works, but gives me a null row if any employees do not have a role assigned
SELECT departments.name AS Department, SUM(roles.salary)
    FROM employees emp
    LEFT JOIN roles
    ON emp.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees mgr
    ON emp.manager_id = mgr.id
    GROUP BY departments.id;


SELECT departments.name AS Department, SUM(roles.salary)
    FROM employees emp
    JOIN roles
    ON emp.role_id = roles.id
    JOIN departments
    ON roles.department_id = departments.id
    GROUP BY departments.id;
