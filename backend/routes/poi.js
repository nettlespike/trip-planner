import express from "express";
import { read, write, del, up } from "../controllers/poi.js";

const router = express.Router();

router.get("/", read);
router.post("/", write);
router.delete("/:pid", del);
router.put("/:pid", up);

export default router;
