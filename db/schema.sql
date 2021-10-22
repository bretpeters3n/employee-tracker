DROP DATABASE IF EXISTS empTrack_db;
CREATE DATABASE empTrack_db;

USE empTrack_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL
);

-- INSERT INTO movies (movie_name)
-- VALUES ("The Wizard of Oz"),
--     ("Halloween"),
--     ("Candyman"),
--     ("Tommy Boy"),
--     ("Deadpool");

-- INSERT INTO reviews (movie_id, review)
-- VALUES (1, "The Wizard of Oz - thumbs up"),
--     (2, "Halloween - thumbs eh"),
--     (3, "Candyman - thumbs down"),
--     (4, "Tommy Boy - thumbs up"),
--     (5, "Deadpool - thumbs way up");