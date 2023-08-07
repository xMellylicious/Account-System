/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/
import express from "express"
import cors from "cors"

require("dotenv").config()

//Dev Config
const isDev = process.env.NODE_ENV === 'development'

//Express
const app = express()
const port = process.env.PORT || 5003

//Middleware
app.use(cors())

//Models


const syncTables = () => {

}

//V1 Routes

//Server
app.listen(port, () => {
    syncTables()
    console.log(`Localhost running on ${port}`)
})