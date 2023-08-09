/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import express from "express";
import { getUser, hashPassword, validateToken, comparePasswords } from "../middleware/user.middleware";
import { createUser, returnUser, createToken } from "../controllers/user.controller";
import { formatUserJson } from "../middleware/format.middleware";
import { whitelist } from "../middleware/whitelist.middleware";

const router = express.Router()

//Public Routes
router.get('/users/find/:ID', getUser, formatUserJson, returnUser)
router.get('/users/authenticated', validateToken, formatUserJson, returnUser)

router.post('/register', whitelist, hashPassword, createUser)
router.post('/authenticate', whitelist, comparePasswords, createToken)

//Individual Routes
//router.get('/information/full', whitelist, validateToken, formatUserJson, getAll) ----> DEPRECATED
//router.get('/information', whitelist, validateToken, getInformation) ----> DEPRECATED
//router.patch('/edit', whitelist, validateToken, updateInfo) ----> DEPRECATED

export default router