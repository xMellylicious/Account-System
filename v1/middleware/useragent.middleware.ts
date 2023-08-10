/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

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