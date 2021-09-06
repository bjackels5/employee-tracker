SELECT CONCAT(emp.first_name, ' ', emp.last_name) as Name,
       CONCAT(mgr.first_name, ' ', mgr.last_name) as Manager
FROM employees AS emp
LEFT JOIN employees AS mgr ON emp.manager_id = mgr.id
WHERE emp.id=1