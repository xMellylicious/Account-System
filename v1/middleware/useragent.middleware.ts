import { Request, Response, NextFunction } from "express";

const getUserAgent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req["user-agent"] = req["useragent"].source

        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

export {getUserAgent}