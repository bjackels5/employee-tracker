INSERT INTO departments (name)
VALUES
    ("Management"),
    ("Detectives"),
    ("Forensics"),
    ("Publicity");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Probationary Agent", 80000, 2),
    ("Special Agent", 100000, 2),
    ("Senior Special Agent", 120000, 2),
    ("Medical Examiner", 120000, 3),
    ("Assistant Medical Examiner", 83000, 3),
    ("Lab Manager", 120000, 3),
    ("Director", 150000, 1),
    ("Publicity Manager", 75000, 4),
    ("Publicity Assistant", 50000, 4),
    ("Lab Assistant", 100000, 3);

-- People with no manager
INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ("Leon", "Vance", 7),
    ("Jenny", "Shepard", 7),
    ("Delilah", "Fielding", 8);

-- The rest of the employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Leroy Jethro", "Gibbs", 3, 1),
    ("Caitlin", "Todd", 1, 4),
    ("Anthony", "DiNozzo", 2, 4),
    ("Ducky", "Mallard", 4, 4), 
    ("Abby", "Sciuto", 6, 1),
    ("Timothy", "McGee", 2, 4),
    ("Ziva", "David", 1, 4),
    ("Jimmy", "Palmer", 5, 7),
    ("Ellie", "Bishop", 1, 4),
    ("Tobias", "Fornell", 9, 3);
