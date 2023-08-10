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
import useragent from "express-useragent"
import ratelimit from "express-rate-limit"

//Routes
//===== V1 ROUTES =====//
import UsersRoute from "./v1/routes/user.routes"
import DefaultRoute from "./v1/routes/default.routes"
import RolesRoute from "./v1/routes/roles.routes"
import PermissionsRoute from "./v1/routes/permissions.routes"

//Models
import UserDBObject from "./models/models/user"
import RoleDBObject from "./models/models/role"
import PermissionDBObject from "./models/models/permission"
import RolePermissionObj from "./models/models/rolepermission"

//Middleware
import { getUserAgent } from "./v1/middleware/useragent.middleware"
import UserRole from "./models/models/userRole"

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
        RoleDBObject.sync({alter:isDev, force: false})
        UserDBObject.sync({alter:isDev, force: false})
        PermissionDBObject.sync({alter:isDev, force: false})

        UserRole.sync({alter:isDev, force: false})
        RolePermissionObj.sync({alter:isDev, force: false})

        UserDBObject.belongsToMany(RoleDBObject, {through:"UserRole", foreignKey:'UserId', as: 'UserRoles'})
        RoleDBObject.belongsToMany(UserDBObject, {through:"UserRole", foreignKey:'RoleId', as: 'RoleUsers'})

        PermissionDBObject.belongsToMany(RoleDBObject, {through:"RolePermission", foreignKey:'PermissionId', as: 'Permissions'})
        RoleDBObject.belongsToMany(PermissionDBObject, {through:"RolePermission", foreignKey:'RoleId', as: 'RolePermissions'})
    }

    //Initialise API Middleware
    private initialiseMiddleware(): void {
        this.app.set('etag', false)
        this.app.use((req, res, next) => {
            res.set('Cache-Control', 'no-store')
            next()
          })
        //Proxy
        this.app.set('trust proxy', '127.0.0.1');

        //API Ratelimit
        this.app.use(ratelimit({
            max:10,
            windowMs: 1 * 60 * 1000
        }))

        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(useragent.express())
        this.app.use(getUserAgent)
    }

    //Configures API Routes
    private loadRoutes(): void {
        //===== V1 ROUTES =====//
        this.app.use('/v1', RolesRoute)
        this.app.use('/v1', UsersRoute)
        this.app.use('/v1', PermissionsRoute)
        this.app.use('/', DefaultRoute)
    }

    //Opens a port for clients to connect to
    private listen() {
        this.app.listen(this.port, () => {
            console.log(`[LISTENING] localhost:${this.port}`);
        })
    }
}

export default new Server()