import express from "express";
import { read, write, filter } from "../controllers/review.js";

const router = express.Router();

router.get("/", read);
router.post("/", write);
router.get("/:rating", filter);

export default router;
