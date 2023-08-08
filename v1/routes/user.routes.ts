import express from "express";
import { hashPassword, validateToken } from "../middleware/user.middleware";
import { createUser } from "../controllers/user.controller";

const router = express.Router()

//Public Routes
router.post('/register', hashPassword, createUser)

//Individual Routes
router.get('/permissions', validateToken)
router.get('/name', validateToken)
router.get('/username', validateToken)
router.get('/email', validateToken)
router.patch('/edit', validateToken)

export default router