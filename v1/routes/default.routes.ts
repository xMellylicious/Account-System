import express from "express";
import { displayHealth } from "../controllers/default.controller";

const router = express.Router()

router.get('/', displayHealth)

export default router