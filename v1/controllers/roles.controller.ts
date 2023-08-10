/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import jsonwebtoken from "jsonwebtoken"
import UserDBObject from "../../models/models/user";
import RoleDBObject from "../../models/models/role";
import { Sequelize, Op } from "sequelize";
import { formatUser } from "../functions/format.functions";
import { config } from "../../config";
import PermissionDBObject from "../../models/models/permission";

const getUserRoles = async(req, res) => {
    try {
        const User = await UserDBObject.findByPk(req["authUser"].id, {
            include: {
                model:RoleDBObject,
                as:"UserRoles",
                attributes: ["id", "name", "desc"]
            },
        })

        let toReturn = await formatUser(User)

        return res.status(200).json({message:`${toReturn["roles"].length} role(s) were found`, username:toReturn["username"], body:toReturn["roles"]})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

const getRoles = async(req, res) => {
    try {
        if (!req.body.toFind || !Array.isArray(req.body.toFind)) {return res.status(400).json({message:"Provided usernames and IDs were not an array or were not provided."})}
        if (req.body.toFind.length > config.search.limitSearchBy) {return res.status(400).json({message:"You've exceeded the amount of items that can be searched.", limit:config.search.limitSearchBy})}
        
        let toReturn = []
        let alreadySearched = []

        for (const x in req.body.toFind) {
            if (alreadySearched.includes(req.body.toFind[x])) {continue}

            let Role = await RoleDBObject.findOne({
                where:{[Op.or]: [
                    Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('name')),
                        Sequelize.fn('lower', req.body.toFind[x]),
                    ),
                    {id:req.body.toFind[x]}
                ]}, 

                include: {
                    model:PermissionDBObject,
                    as:"RolePermissions",
                    attributes: ["id", "name"]
                },
            })

            if (!Role) {continue}

            alreadySearched.push(Role["dataValues"].id, Role["dataValues"].name.toLowerCase())
            toReturn.push(Role["dataValues"])   

            //console.log(req.body.toFind[x])
        }

        return res.status(200).json({message:`${toReturn.length} Role(s) found`, body: toReturn})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

const createRole = async (req, res) => {
    try {
        const newRole = await RoleDBObject.create(req.body)
        return res.status(201).json({message:"Role created successfully", body:newRole})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

const assignRole = async (req, res) => {
    try {
        if (!req.body.userId || !req.body.roleId) {return res.status(400).json({message:"Role/User ID were not provided"})}

        const Role = await RoleDBObject.findAll({where:{id:req.body.roleId}})
        const User = await UserDBObject.findByPk(req.body.userId)

        if (!Role || !User) {return res.status(404).json({message:"Role/User were not found in the database"})}

        User.addRoles(Role)

        return res.status(200).json({message:"Role assigned successfully", role:Role})
        //User.setRoles()
    } catch (e) {
        console.log(e)
        return res.status(500).json({message:e.message})
    }
}

const editRole = async(req, res) => {
    try {
        if (!req.body.roleId) {return res.status(400).json({message:"Role ID was not provided"})}

        const Role = await RoleDBObject.findOne({where:{id:req.body.roleId}})

        if (!Role) {return res.status(404).json({message:"Specified role was not found in the database"})}

        for (var x in req.body.updateInfo) {
            if (x !== "id" && x !== "createdAt" && x !== "updatedAt") {
                await Role.update({
                    [x]: req.body.updateInfo[x]
                })
            }
        }

        return res.status(200).json({message:"Role successfully modified", role:Role})
        //User.setRoles()
    } catch (e) {
        console.log(e)
        return res.status(500).json({message:e.message})
    }
}

const deleteRole  = async (req, res) => {
    try {
        if (!req.body.roleId) {return res.status(400).json({message:"Role/User ID were not provided"})}

        const Role = await RoleDBObject.findByPk(req.body.roleId)

        if (!Role) {return res.status(405).json({message:"Role was not found"})}

        await Role.destroy()

        return res.status(200).json({message:"Role successfully deleted"})
        //User.setRoles()
    } catch (e) {
        console.log(e)
        return res.status(500).json({message:e.message})
    }
}

export {createRole, assignRole, getUserRoles, getRoles, deleteRole, editRole}