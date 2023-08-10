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
import { createRole, assignRole, getUserRoles, getRoles, getRole, deleteRole, editRole } from "../controllers/roles.controller";

const router = express.Router()

//Public Routes
router.get('/role/:ID', getRole)

router.get('/roles', whitelist, validateToken, getUserRoles)
router.post('/roles/find', whitelist, validateToken, getRoles)
router.post('/roles/create', whitelist, validateToken, createRole)
router.patch('/roles/update', whitelist, validateToken, editRole)
router.post('/roles/assign', whitelist, validateToken, assignRole)
router.delete('/roles/delete', whitelist, validateToken, deleteRole)

export default router