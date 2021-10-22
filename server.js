const express = require("express");
const path = require("path");
const mysql = require("mysql2");

// 'process.env.PORT' was added for production environments
const PORT = process.env.PORT || 3001;
const app = express();

// TODO: Implement middleware for the parsing of JSON data
// TODO: Implement middleware for parsing of URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "classlist_db",
  },
  console.log(`Connected to the classlist_db database.`)
);

// GET request that returns a page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

// GET request that returns data
app.get("/api/data", (req, res) => {
  // code which gathers up the data
  const data = {};
  // return the data
  res.status(200).json(data);
});

// GET request that returns data by id value
app.get("/api/data/:id", (req, res) => {
  // get the id value
  const dataId = req.params.id;
  // gather up the data
  const data = {};
  // return the data
  res.status(200).json(data);
});

// POST request that handles submitted data
app.post("/api/widget", (req, res) => {
  // grab the data submitted
  const data = req.body;
  // do something with it... then send back a response
  res.json({ result: "success" });
});

// Tell express to start listening!
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
