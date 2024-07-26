import express from "express";
import { reservation, noreservation, weekend, pid } from "../controllers/filter.js";

const router = express.Router();

router.get("/reservation", reservation);
router.get("/noreservation", noreservation);
router.get("/weekend", weekend);
router.get("/:pid", pid);

export default router;
