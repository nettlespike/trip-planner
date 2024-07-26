import { db } from "../index.js";

export const read = (req, res) => {
    const q = "SELECT * FROM review"
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
    const q = "SELECT * FROM review WHERE experience_rating >= ?";
    db.query(q, [rating], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
};
