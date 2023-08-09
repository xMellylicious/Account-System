import { Request, Response, NextFunction } from "express";

const whitelist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let validIps = ['::1', '::ffff:127.0.0.1', '127.0.0.1', '176.254.14.125'];
        
        if(!validIps.includes(req.socket.remoteAddress)) {return res.status(403).json({message:"IP not whitelisted"})}

        next()
    } catch (e) {
        return res.status(500).json({message:e.message})
    }   
}

export {whitelist}