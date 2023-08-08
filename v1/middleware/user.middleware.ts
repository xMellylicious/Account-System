import { argon2i } from "argon2-ffi";
import jsonwebtoken from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import UserDBObject from "../../models/models/user";
const crypto = require("crypto")

async function hashPassword(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.body || !req.body.password) { throw new Error("Incorrect details were passed to the API!")}
        let salt = await crypto.randomBytes(32)
        req.body.password = await argon2i.hash(req.body.password, salt)
        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.header("Authorisation")) {throw new Error("Provided token was invalid")}
        const decodedToken = jsonwebtoken.verify(req.header("Authorisation").replace("Bearer ", ""), process.env.JWT_SECRET)
        const User = await UserDBObject.findOne({where: {id:decodedToken["id"]}})

        if (!User) {throw new Error("User was not found!")}
        if (User.permissionLevel < 1) {throw new Error("User has no permissions to execute")}

        req["authUser"] = User
        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

export {hashPassword, validateToken}