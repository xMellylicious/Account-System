/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/
import PermissionDBObject from "../../models/models/permission"
import RoleDBObject from "../../models/models/role"

const createPermission = async (req, res) => {
    try {
        const newPermission = await PermissionDBObject.create(req.body)
        return res.status(201).json({message:"Permission created successfully", body:newPermission})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

const assignPermission = async (req, res) => {
    try {
        if (!req.body.roleId || !req.body.permissionId) {return res.status(400).json({message:"Role/User ID were not provided"})}

        const Role = await RoleDBObject.findByPk(req.body.roleId)
        const Permission = await PermissionDBObject.findAll({where:{id:req.body.permissionId}})

        if (!Role || !Permission) {return res.status(404).json({message:"Role/Permission were not found in the database"})}

        Role.addPermissions(Permission)

        return res.status(200).json({message:"Permission assigned successfully"})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
}

export {createPermission, assignPermission}