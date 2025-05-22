import express from "express";
import { identify } from "../controllers/contactController";

const router = express.Router();

router.post("/identify", identify);

export default router;
