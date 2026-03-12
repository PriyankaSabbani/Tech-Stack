import express from "express";
import {
  getAllBuses,
  getBus,
  createBus,
  updateBus,
  deleteBus,
} from "../controllers/busController.js";

const router = express.Router();

router.get("/", getAllBuses);
router.get("/:id", getBus);
router.post("/", createBus);
router.put("/:id", updateBus);
router.delete("/:id", deleteBus);

export default router;