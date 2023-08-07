/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import express from "express";

abstract class Route {
    public router: express.Router

    constructor() {
        this.router = express.Router()
        this.configureRoutes()
    }

    public abstract configureRoutes()
}

export default Route;