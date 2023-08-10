/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import { argon2i } from "argon2-ffi";
import jsonwebtoken from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import UserDBObject from "../../models/models/user";
import RoleDBObject from "../../models/models/role";
const crypto = require("crypto")

const getUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.ID) {return res.status(400).json({message:"Incorrect Details were sent to the API."})}
        
        let user = await UserDBObject.findOne({where:{[Op.or]: [
                {id:req.params.ID},
                {username:req.params.ID}
            ]}, 
            include: {
                model:RoleDBObject,
                as:"UserRoles",
                attributes: ["id", "name", "desc"],
            }
        })

        if (!user) {return res.status(404).json({message:"This user was not found."})}

        req["authUser"] = user

        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

async function hashPassword(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.body || !req.body.password) { throw new Error("Incorrect details were passed to the API!")}
        let salt = await crypto.randomBytes(32)
        req.body.salt = salt
        req.body.password = await argon2i.hash(req.body.password, req.body.salt)
        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

async function comparePasswords(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.body.password) {return res.status(401).json({message:"Passwords do not match"})}

        req["authUser"] = await UserDBObject.findOne({
            where: {
                id:req.body.id
            }
        })
        
        if (!req["authUser"]) {return res.status(404).json({message:"User not found"})}
        if (req["authUser"].permissionLevel < 1) {return res.status(403).json({message:"User has no permissions to execute"})}

        const password = argon2i.verify(req["authUser"].password, req.body.password)

        if (!password) {return res.status(401).json({message:"Passwords do not match"})}
        
        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.header("Authorization")) {return res.status(400).json(false)}
        const decodedToken = jsonwebtoken.verify(req.header("Authorization").replace("Bearer ", ""), process.env.JWT_SECRET)
        const User = await UserDBObject.findOne(
            {where: {id:decodedToken["id"]},
            include: {
                model:RoleDBObject,
                as:"UserRoles",
                attributes: ["id", "name", "desc"],
            }
        })

        if (!User) {return res.status(404).json(false)}
        if (User.permissionLevel < 1 || User.isBanned) {return res.status(403).json(false)}
        
        req["authUser"] = User

        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

export {getUser, hashPassword, validateToken, comparePasswords}