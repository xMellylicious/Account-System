import { argon2i } from "argon2-ffi";
import jsonwebtoken from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import UserDBObject from "../../models/models/user";
const crypto = require("crypto")

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
        if (!req.header("Authorization")) {throw new Error("Provided token was invalid")}
        const decodedToken = jsonwebtoken.verify(req.header("Authorization").replace("Bearer ", ""), process.env.JWT_SECRET)
        const User = await UserDBObject.findOne({where: {id:decodedToken["id"]}})

        if (!User) {throw new Error("User was not found!")}
        if (User.permissionLevel < 1) {throw new Error("User has no permissions to execute")}

        req["authUser"] = User
        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

export {hashPassword, validateToken, comparePasswords}