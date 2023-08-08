import UserDBObject from "../../models/models/user";

async function createUser(req, res) {
    try {
        req.body.permissionLevel = 1
        const newUser = await UserDBObject.create(req.body)
        return res.status(201).json({message:"User created successfully", body:{username:newUser.username}})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

async function getInformation(req, res) {
    try {
        const toReturn = []

        for (var x in req.body) {
            toReturn.push(req.authUser[x])
        }

        return res.status(201).json({message:"Details obtained", body:toReturn})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }   
}

export {createUser, getInformation}