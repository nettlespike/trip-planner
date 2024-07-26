import express from "express";
import { read, write, del, up } from "../controllers/schedule.js";

const router = express.Router();

router.get("/:uid", read);
router.post("/", write);
router.delete("/:sno", del);
router.put("/:sno", up);

export default router;
