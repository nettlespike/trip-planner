import express from "express"
import mysql from "mysql2"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test_trip"
})

app.get("/", (req, res) => {
    res.json("front page")
})


app.get("/poi", (req,res)=> {
    const q = "SELECT * FROM poi" 
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post("/poi", (req,res) => {
    
    const q = "INSERT INTO `test_trip`.`poi`(`pid`,`name`,`days_of_week`, `time`, `address`, `reservation_details`, `reservation_required`, `location`, `accessibility`) VALUES (?)"
    const values = [
        req.body.pid,
        req.body.name,
        "",
        "",
        "",
        "",
        req.body.reservation_required,
        "",
    ]

    db.query(q, [values], (err, data)=> {
        if (err) return res.json(err)
        return res.json("Created")
    })
})

app.listen(8800, ()=> {
    console.log("Connected!")
})