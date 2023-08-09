import { Request, Response, NextFunction } from "express";
import { formatUser } from "../functions/format.functions";

const formatUserJson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req["authUser"]) {return res.status(404).json({message:"The requested user was not found."})}

        req["requestedUser"] = await formatUser(req["authUser"])

        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }   
}

export {formatUserJson}