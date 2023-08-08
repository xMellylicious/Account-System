import { Request, Response, NextFunction } from "express";

const formatUserJson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req["authUser"].password = null
        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }   
}

export {formatUserJson}