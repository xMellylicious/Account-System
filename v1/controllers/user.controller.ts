import jsonwebtoken from "jsonwebtoken"
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
            toReturn.push(req.authUser[req.body[x]])
        }

        return res.status(201).json({message:"Details obtained", body:toReturn})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }   
}

async function createToken(req, res) {
    try {
        let token = await jsonwebtoken.sign({id: req.authUser.id}, process.env.JWT_SECRET);

        return res.status(201).json({message:"Token creation successful", body:{
            userDetails: {
                id:req.authUser.id,
                username:req.authUser.username
            },
            token:token
        }})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }   
}

async function updateInfo(req, res) {
    try {
        for (var x in req.body) {
            if (x !== "id" && x !== "permissionLevel" && x !== "createdAt" && x !== "updatedAt") {
                await UserDBObject.update({
                    [x]: req.body[x]
                }, {where:{id:req.authUser.id}})
            }
        }

        return res.status(200).json({message:"User's details have been updated", body:{id:req.authUser.id}})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }   
}

async function getAll(req, res) {
    try {
        return res.status(200).json({message:"User's details have been updated", user:req["authUser"]})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }  
}

export {createUser, getInformation, createToken, updateInfo, getAll}