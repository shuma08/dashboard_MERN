import express from "express";
import { getUser, getDashboardStats } from "../controllers/generals.js"

const router = express.Router();

router.get("/user/:id", getUser)
router.get("/dashboard", getDashboardStats)
export default router