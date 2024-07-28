import { db } from "../index.js";

export const read = (req, res) => {
    const q = "SELECT R.*, P.name FROM review AS R JOIN (SELECT pid, name FROM poi) AS P ON R.poi_code = P.pid;"
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
};

export const write = (req,res) => {
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
};

export const filter = (req, res) => {
    const rating = req.params.rating;
    const q = "SELECT R.*, P.name FROM (SELECT * FROM review WHERE experience_rating >= ? ORDER BY experience_rating) AS R INNER JOIN (SELECT pid, name FROM poi) AS P ON R.poi_code = P.pid ORDER BY experience_rating;";
    db.query(q, [rating], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
};
