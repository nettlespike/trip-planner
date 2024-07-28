import express from "express";
import { reservation, noreservation, weekend, pid } from "../controllers/filter.js";

const router = express.Router();

router.get("/reservation", reservation); // view POIs that require reservation
router.get("/noreservation", noreservation); // view POIs that do not require reservation
router.get("/weekend", weekend); // view POIs that are open weekends
router.get("/:pid", pid); // search for specific POIs by pid

export default router;
