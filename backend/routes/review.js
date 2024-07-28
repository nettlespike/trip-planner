import express from "express";
import { read, write, filter } from "../controllers/review.js";

const router = express.Router();

router.get("/", read); // view reviews
router.post("/", write); // add new reviews
router.get("/:rating", filter); // view reviews, filter by rating

export default router;
