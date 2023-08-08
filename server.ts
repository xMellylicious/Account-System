/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/
require("dotenv").config()

import express from "express"
import cors from "cors"

//Routes
//===== V1 ROUTES =====//
import UsersRoute from "./v1/routes/user.routes"

//Models
import UserDBObject from "./models/models/user"

//Dev Config
const isDev = process.env.NODE_ENV === 'development'

//Express
const app = express()
const port = process.env.PORT || 5013

//Server
class Server {
    public app: express.Application;
    public port: string;

    //Constructs the Server Class
    constructor() {
        this.build()
    }

    public async build() {
        this.app = express();
        this.port = process.env.PORT || "5013"

        //Initialise the Database
        await this.initialiseDatabase();

        //Initialise Custom Middleware
        this.initialiseMiddleware();

        //Load API Routes
        this.loadRoutes();

        //Open the API on the Specified Port
        this.listen();
    }

    private async initialiseDatabase() {
        UserDBObject.sync({alter:isDev})
    }

    //Initialise API Middleware
    private initialiseMiddleware(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }

    //Configures API Routes
    private loadRoutes(): void {
        //===== V1 ROUTES =====//
        this.app.use('/v1/users', UsersRoute)
    }

    //Opens a port for clients to connect to
    private listen() {
        this.app.listen(this.port, () => {
            console.log(`[LISTENING] localhost:${this.port}`);
        })
    }
}

export default new Server()