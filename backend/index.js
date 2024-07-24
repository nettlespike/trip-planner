import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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
app.use("/poi/users", userRoutes);

app.get("/", (req, res) => {
    res.json("front page")
})

app.get("/users", (req,res)=> {
   const q = "SELECT * FROM users"
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/review", (req, res) => {
    const q = "SELECT * FROM review"
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

// filters

app.get("/reservation", (req,res)=> {
    const q = "SELECT * FROM poi WHERE reservation_required = '1'"
    db.query(q, (err, data)=> {
        if(err) {
             return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/noreservation", (req,res)=> {
    const q = "SELECT * FROM poi WHERE reservation_required = '0'"
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/weekend", (req,res)=> {
    const q = "SELECT * FROM poi WHERE time LIKE '%Sunday%Saturday%'"
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/rating/:rating", (req, res) => {
    const rating = req.params.rating;
    const q = "SELECT * FROM review WHERE experience_rating >= ?";
  
    db.query(q, [rating], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

app.get("/search/:pid", (req, res) => {
    const pid = req.params.pid;
    const q = "SELECT * FROM poi WHERE pid = ?";

    db.query(q, [pid], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// search for password

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

///// add POI (admin view)

app.get("/poi", (req,res)=> {
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
    const q = "INSERT INTO poi(`name`,`days_of_week`,`time`,`address`,`reservation_details`,`reservation_required`,`location`, `accessibility`) VALUES (?)";
    const values = [
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

app.post("/", (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const q = "INSERT INTO review(`experience_rating`,`would_revisit_rating`,`comment`) VALUES (?)";
    const values = [
        req.body.experience_rating,
        req.body.would_revisit_rating,
        req.body.comment,
    ]
    db.query(q, [values], (err, data)=> {
        if (err) return res.send(err);
        return res.json(data);
    })
})

///// schedule

app.get("/schedule/:uid", (req, res) => {
    const uid = req.params.uid;
    const  q = "SELECT schedule.*, poi.name, poi.reservation_details FROM schedule LEFT JOIN poi ON schedule.pid = poi.pid WHERE schedule.cus_no = ?";
    db.query(q, [uid], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
})

app.get("/rating/:rating", (req, res) => {
    const rating = req.params.rating;
    const q = "SELECT * FROM review WHERE experience_rating >= ?";
    db.query(q, [rating], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

app.post("/schedule", (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const q = "INSERT INTO schedule(`cus_no`,`pid`) VALUES (?)"
    const values = [
        req.body.user.uid,
        req.body.poi,
    ]
    db.query(q, [values], (err, data)=> {
        if (err) return res.send(err);
        return res.json(data);
    })
})

app.delete("/schedule/:sno", (req, res) => {
    const sno = req.params.sno;
    const q = " DELETE FROM schedule WHERE sno = ? ";
  
    db.query(q, [sno], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

app.put("/schedule/:sno", (req, res) => {
    const sno = req.params.sno;
    const q = "UPDATE schedule SET `date`= ?, `time`= ? WHERE sno = ?";

    const values = [
        req.body.date,
        req.body.time,
    ];

    db.query(q, [...values, sno], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.listen(8800, ()=> {
    console.log("Connected!")
})