INSERT INTO department (name)
VALUES ("Sales"),
    ("Engineering"),
    ("Project Management"),
    ("Creative");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales", 70000, 1),
    ("Sales Lead", 90000, 1),
    ("Lead Engineer", 110000, 2),
    ("Software Engineer", 80000, 2),
    ("Project Manager", 65000, 3),
    ("Lead Designer", 90000, 4),
    ("Designer", 85000, 4),
    ("Design Intern", 0, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Flash", 1, 2),
    ("Jane", "Blaine", 2, null),
    ("Bret", "Terret", 3, null),
    ("Billy", "Willy", 4, 3),
    ("Pam", "Spam", 5, null),
    ("Jill", "Jackolantern", 6, null),
    ("Renee", "Billet", 7, 6),
    ("Baby", "Maybe", 8, 6);