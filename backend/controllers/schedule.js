import { db } from "../index.js";

export const read = (req, res) => {
    const uid = req.params.uid;
    const  q = "SELECT schedule.*, poi.name, poi.reservation_details FROM schedule LEFT JOIN poi ON schedule.pid = poi.pid WHERE schedule.cus_no = ?";
    db.query(q, [uid], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
};

export const write = (req,res) => {
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
};

export const del = (req, res) => {
    const sno = req.params.sno;
    const q = " DELETE FROM schedule WHERE sno = ? ";
  
    db.query(q, [sno], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
};

export const up = (req, res) => {
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
};