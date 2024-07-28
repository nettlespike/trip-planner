import express from "express";
import { read, write, del, up } from "../controllers/schedule.js";

const router = express.Router();

router.get("/:uid", read); // view the current user's schedule
router.post("/", write); // add new entry to schedule
router.delete("/:sno", del); // delete specified entry from schedule
router.put("/:sno", up); // update existing schedule entry

export default router;
