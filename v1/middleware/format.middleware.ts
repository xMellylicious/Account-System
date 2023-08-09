import { Request, Response, NextFunction } from "express";

const formatUserJson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req["authUser"]) {return res.status(404).json({message:"The requested user was not found."})}

        let oldArr = req["authUser"]

        req["requestedUser"] = {
            id:oldArr.id,
            username:oldArr.username,
        }

        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }   
}

export {formatUserJson}