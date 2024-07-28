import express from "express";
import { read, write, del, up } from "../controllers/poi.js";

const router = express.Router();

router.get("/", read); // view existing POIs
router.post("/", write); // add new POIs
router.delete("/:pid", del); // delete existing POIs
router.put("/:pid", up); // update existing POIs

export default router;
