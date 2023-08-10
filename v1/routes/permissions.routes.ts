/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import express from "express";
import { getUser, hashPassword, validateToken, comparePasswords } from "../middleware/user.middleware";
import { whitelist } from "../middleware/whitelist.middleware";
import { createPermission, assignPermission } from "../controllers/permissions.controller";

const router = express.Router()

router.post('/permissions/create', whitelist, validateToken, createPermission)
router.post('/permissions/assign', whitelist, validateToken, assignPermission)

export default router