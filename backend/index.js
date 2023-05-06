var express = require("express");
var cors = require("cors");
var app = express();
var { Pool } = require("pg");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// try {
//   var connection = mysql.createConnection({
//     host: "db",
//     user: "root",
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: "3306",
//   });
try {
  var pool = new Pool({
    user: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: "5432",
  });

  console.log("Connected");
} catch (err) {
  console.log("Error : " + err);
}

pool.connect((err) => {
  if (err) {
    console.log("Error connecting to PostgreSQL: ", err);
  } else {
    console.log("Connected to PostgreSQL!");
    // pool.query(
    //   `CREATE TABLE student (
    //       student_id SERIAL PRIMARY KEY,
    //       student_name VARCHAR(255) NOT NULL,
    //       student_age INT NOT NULL
    //     );`,
    //   (err, res) => {
    //     if (err) throw err;
    //     console.log("Table created");
    //     pool.end();
    //   }
    // );
  }
});

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.get("/students", function (req, res, next) {
  pool.query("SELECT * FROM Student;", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/student", (req, res) => {
  const { name, age } = req.body;
  console.log(req.body);
  pool.query(
    `INSERT INTO Student (student_name, student_age) VALUES ('${name}',${age})`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ save: "success" });
      }
    }
  );
});

app.delete("/student/:id", (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM Student WHERE student_id = ${id}`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ delete: "success" });
    }
  });
});

app.get("/student/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `Select * FROM Student WHERE student_id = ${id}`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ results });
      }
    }
  );
});

// app.put("/student/:id", (req, res) => {
//   const id = req.params.id;
//   const { name, age } = req.body;

//   connection.query(
//     `UPDATE Student SET student_name = '${name}',student_age = '${age}' WHERE student_id = ${id} `,
//     (err, results) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json({ update: "success" });
//       }
//     }
//   );
// });

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
