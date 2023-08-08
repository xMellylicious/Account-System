import express from "express";
import { hashPassword, validateToken, comparePasswords } from "../middleware/user.middleware";
import { createUser, getInformation, createToken, updateInfo, getAll } from "../controllers/user.controller";
import { formatUserJson } from "../middleware/format.middleware";

const router = express.Router()

//Public Routes
router.post('/register', hashPassword, createUser)
router.post('/authenticate', comparePasswords, createToken)

//Individual Routes
router.get('/information/full', validateToken, formatUserJson, getAll)
router.get('/information', validateToken, getInformation)
router.patch('/edit', validateToken, updateInfo)

export default router