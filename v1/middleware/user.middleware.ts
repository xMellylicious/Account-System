import { argon2i } from "argon2-ffi";
import { Request, Response, NextFunction } from "express";
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

export {hashPassword}