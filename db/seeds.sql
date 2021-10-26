INSERT INTO department (name)
VALUES ("Owner"),
    ("Sales"),
    ("Engineering"),
    ("Project Management"),
    ("Creative");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 100000, 1),
    ("Sales Lead", 90000, 2),
    ("Lead Engineer", 110000, 3),
    ("Software Engineer", 80000, 3),
    ("Project Manager", 65000, 4),
    ("Lead Designer", 90000, 5),
    ("Designer", 85000, 5),
    ("Intern", 0, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "theCEO", 1),
    ("Jane", "theSalesLead", 2, 1),
    ("Bret", "theLeadEngineer", 3, 1),
    ("Billy", "theSoftEngineer", 4, 3),
    ("Pam", "theProjManager", 5, 1),
    ("Jill", "theLeadDesigner", 6, 1),
    ("Renee", "theDesigner", 7, 6),
    ("Baby", "theIntern", 8, 6);