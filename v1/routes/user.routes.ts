import express from "express";
import { hashPassword, validateToken } from "../middleware/user.middleware";
import { createUser, getInformation } from "../controllers/user.controller";

const router = express.Router()

//Public Routes
router.post('/register', hashPassword, createUser)

//Individual Routes
router.get('/information', validateToken, getInformation)
router.patch('/edit', validateToken)

export default router