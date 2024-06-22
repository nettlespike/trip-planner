import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"

const app = express()
const result = dotenv.config()

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

app.get("/", (req, res) => {
    res.json("front page")
})


app.get("/poi", (req,res)=> {
    const q = "SELECT * FROM poi WHERE days_of_week like '%F%'" 
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

/*
app.post("/poi", (req,res) => {
    
    const q = "SELECT * FROM poi where review >= 3"
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
})*/

app.listen(8800, ()=> {
    console.log("Connected!")
})