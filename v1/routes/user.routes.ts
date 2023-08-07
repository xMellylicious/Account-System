import Route from "../../objects/route.object";

import { hashPassword } from "../middleware/user.middleware";
import UserDBObject from "../../models/models/user";

export default class UsersRoute extends Route {
    public configureRoutes() {
        this.router.post('/register', hashPassword, async(req, res) => {
            try {
                const newUser = await UserDBObject.create(req.body)
                return res.status(201).json({message:"User created successfully", body:{username:newUser.username}})
            } catch (e) {
                return res.status(500).json({message:e.message})
            }
        })
    }
}