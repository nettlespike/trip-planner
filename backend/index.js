import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"

const app = express()
const result = dotenv.config()

import cors from "cors"
// const cors = require('cors')
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }


const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

app.get("/", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.json("front page")
})


app.get("/poi", (req,res)=> {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    const q = "SELECT * FROM poi" 
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

app.listen(8800, ()=> {
    console.log("Connected!")
})

// app.use(cors(corsOptions));
app.use(cors()) 