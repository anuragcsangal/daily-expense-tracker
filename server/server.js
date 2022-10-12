const express = require("express");
const app = express();
const cors = require('cors')
const mysql = require("mysql2");


app.use(cors())
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "daile",
});

app.post("/create", (req, res) => {
  const breakfast = req.body.breakfast;
  const lunch = req.body.lunch;
  const dinner = req.body.dinner;
  const misc = req.body.misc;

  db.query(
    "INSERT INTO expenses (breakfast, lunch, dinner, misc) VALUES (?,?,?,?)",
    [breakfast, lunch, dinner, misc],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get('/Expenses', (req, res) => {
    db.query('SELECT * FROM expenses', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
  console.log("Server is running");
});
