import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"

const app = express()
const result = dotenv.config()

import cors from "cors"

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

app.use(cors()) 
app.use(express.json())

app.get("/", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.json("front page")
})

app.get("/poi", (req,res)=> {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    const q = "SELECT * FROM poi LIMIT 10" 
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post("/poi", (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const q = "INSERT INTO poi(`pid`,`name`,`days_of_week`,`time`,`address`,`reservation_details`,`reservation_required`,`location`, `accessibility`) VALUES (?)";
    const values = [
        req.body.pid,
        req.body.name,
        req.body.days_of_week,
        req.body.time,
        req.body.address,
        req.body.reservation_details,
        req.body.reservation_required,
        req.body.location,
        req.body.accessibility,
    ]
    db.query(q, [values], (err, data)=> {
        if (err) return res.send(err);
        return res.json(data);
    })
})

app.delete("/poi/:pid", (req, res) => {
    const pId = req.params.pid;
    const q = " DELETE FROM poi WHERE pid = ? ";
  
    db.query(q, [pId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.put("/poi/:pid", (req, res) => {
    const pId = req.params.pid;
    console.log(pId)
    const q = "UPDATE poi SET `name`= ?, `days_of_week`= ?, `time`= ?, `address`= ?, `reservation_details`= ?, `reservation_required`= ?, `location`= ?, `accessibility`= ? WHERE pid = ?";

    const values = [
        req.body.name,
        req.body.days_of_week,
        req.body.time,
        req.body.address,
        req.body.reservation_details,
        req.body.reservation_required,
        req.body.location,
        req.body.accessibility,
    ];

    db.query(q, [...values, pId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.listen(8800, ()=> {
    console.log("Connected!")
})