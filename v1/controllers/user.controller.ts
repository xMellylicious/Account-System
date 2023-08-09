/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import jsonwebtoken from "jsonwebtoken"
import UserDBObject from "../../models/models/user";
import { Sequelize, Op } from "sequelize";
import { formatUser } from "../functions/format.functions";
 
const createUser = async (req, res) => {
    try {
        req.body.permissionLevel = 1
        const newUser = await UserDBObject.create(req.body)
        return res.status(201).json({message:"User created successfully", body:{username:newUser.username}})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

const returnUser = async (req, res) => {
    try {
        if (!req["requestedUser"]) {return res.status(404).json({message:"No user was found!"})}
        if (!req.params.ID && !req["requestedUser"]) {return res.status(400).json({message:"No ID was provided"})}

        return res.status(200).json({message:"The requested user was found.", body:req["requestedUser"]})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

const getUsers = async(req, res) => {
    try {
        if (!req.body.toFind || !Array.isArray(req.body.toFind)) {return res.status(400).json({message:"Provided usernames were not an array or were not provided."})}

        let toReturn = []
        let alreadySearched = []

        for (const x in req.body.toFind) {
            if (!alreadySearched.includes(req.body.toFind[x])) {
                let User = await UserDBObject.findOne({
                    where:{[Op.or]: [
                        Sequelize.where(
                            Sequelize.fn('lower', Sequelize.col('username')),
                            Sequelize.fn('lower', req.body.toFind[x]),
                        ),
                        {id:req.body.toFind[x]}
                    ]}
                })
                let formattedJson = await formatUser(User["dataValues"])

                alreadySearched.push(formattedJson.id, formattedJson.username.toLowerCase())

                toReturn.push(formattedJson)   
            }
            //console.log(req.body.toFind[x])
        }

        return res.status(200).json({message:"The requested users were found.", body: toReturn})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

//DEPRECATED
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

//DEPRECATED
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

//DEPRECATED
async function getAll(req, res) {
    try {
        return res.status(200).json({message:"User sent", body:req["authUser"]})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }  
}

export {createUser, returnUser, createToken, getUsers}