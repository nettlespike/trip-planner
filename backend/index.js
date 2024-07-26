import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js";
import scheduleRoutes from "./routes/schedule.js";
import reviewRoutes from "./routes/review.js";
import poiRoutes from "./routes/poi.js";
import filterRoutes from "./routes/filter.js";
import cookieParser from "cookie-parser";

const app = express()
const result = dotenv.config()

export const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

app.use(cors()) 
app.use(express.json())
app.use(cookieParser())

app.use("/poi/auth", authRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/review", reviewRoutes);
app.use("/poi", poiRoutes); // admin
app.use("/search", filterRoutes);

app.get("/", (req, res) => {
    res.json("front page")
})

app.get("/analytics", (req, res) => {

    const  q = "SELECT info.pid, info.popularity, ROUND(info.rating, 2) as rating, poi.name, poi.reservation_details FROM poi RIGHT JOIN (SELECT popTable.*, rateTable.rating from (SELECT pid, COUNT(*) as popularity FROM schedule GROUP BY pid) AS popTable LEFT JOIN (SELECT poi_code, avg(would_revisit_rating) as rating FROM review GROUP BY poi_code) as rateTable ON rateTable.poi_code = popTable.pid) AS info ON poi.pid = info.pid ORDER BY info.popularity DESC";

    db.query(q, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
});

app.get("/tablepartition", (req, res) => {
    const q = "select * from review order by date"
    db.query(q, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
});

// search for password / user info

app.get("/users", (req,res)=> {
   const q = "SELECT * FROM users"
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/searchuser", (req, res) => {
    const email = req.params.email;
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.get("/searchuser/:user", (req, res) => {
    const email = req.params.user;
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], (err, data) => {
        console.log(q)
        if (err) return res.send(err);
        return res.json(data);
    });
});

// app.get("/password", (req, res) => {
//     const pid = req.params.uid;
//     const q = "SELECT * FROM users WHERE uid = ?";
//     const values = [
//         req.body.username,
//         req.body.email,
//     ]
//     db.query(q, [values], (err, data)=> {
//         if (err) return res.send(err);
//         return res.json(data);
//     })
// });

app.listen(8800, ()=> {
    console.log("Connected!")
})