import { db } from "../index.js";

export const reservation = (req,res)=> {
    const q = "SELECT * FROM poi WHERE reservation_required = '1'"
    db.query(q, (err, data)=> {
        if(err) {
             return res.json(err)
        }
        return res.json(data)
    })
};

export const noreservation = (req,res)=> {
    const q = "SELECT * FROM poi WHERE reservation_required = '0'"
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
};

export const weekend = (req,res)=> {
    const q = "SELECT * FROM poi WHERE time LIKE '%Sunday%Saturday%'"
    db.query(q, (err, data)=> {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
};

export const pid = (req, res) => {
    const pid = req.params.pid;
    const q = "SELECT * FROM poi WHERE pid = ?";

    db.query(q, [pid], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
};