import { Request, Response, NextFunction } from "express";

const formatUserJson = async (req: Request, res: Response, next: NextFunction) => {
    try {
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