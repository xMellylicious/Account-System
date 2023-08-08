import express from "express";
import { hashPassword, validateToken, comparePasswords } from "../middleware/user.middleware";
import { createUser, getInformation, createToken, updateInfo, getAll } from "../controllers/user.controller";

const router = express.Router()

//Public Routes
router.post('/register', hashPassword, createUser)
router.post('/authenticate', comparePasswords, createToken)

//Individual Routes
router.get('/information', validateToken, getInformation)
router.patch('/edit', validateToken, updateInfo)
router.get('/all', validateToken, getAll)

export default router