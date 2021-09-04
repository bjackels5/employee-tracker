INSERT INTO departments (id, name)
VALUES
    (1, "Management"),
    (2, "Detectives"),
    (3, "Forensics"),
    (4, "Publicity");

INSERT INTO roles (id, title, salary, department_id)
VALUES
    (1, "Probationary Agent", 80000, 2),
    (2, "Special Agent", 100000, 2),
    (3, "Senior Special Agent", 120000, 2),
    (4, "Medical Examiner", 120000, 3),
    (5, "Assistant Medical Examiner", 83000, 3),
    (6, "Lab Manager", 120000, 3),
    (7, "Director", 150000, 1),
    (8, "Publicity Manager", 75000, 4),
    (9, "Publicity Assistant", 50000, 4),
    (10, "Lab Assistant", 100000, 3);

-- Managers
INSERT INTO employees (id, first_name, last_name, role_id)
VALUES
    (1, "Leon", "Vance", 7),
    (9, "Jenny", "Shepard", 7),
    (12, "Delilah", "Fielding", 8);

-- The rest of the employees
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
    (2, "Leroy Jethro", "Gibbs", 3, 1),
    (3, "Caitlin", "Todd", 1, 2),
    (4, "Anthony", "DiNozzo", 2, 2),
    (5, "Ducky", "Mallard", 4, 2), 
    (6, "Abby", "Sciuto", 6, 1),
    (7, "Timothy", "McGee", 2, 2),
    (8, "Ziva", "David", 1, 2),
    (10, "Jimmy", "Palmer", 5, 5),
    (11, "Ellie", "Bishop", 1, 2),
    (13, "Tobias", "Fornell", 9, 12);
