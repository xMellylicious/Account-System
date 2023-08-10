/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import { DataTypes, Model, Optional } from "sequelize"
import connection from "../connection"
import { IRoleType, IRoleTypeInput } from "../../interfaces/role"
import PermissionDBObject from "./permission";

class RoleDBObject extends Model<IRoleType, IRoleTypeInput> implements IRoleType {
    public id: number;
    public name: string;
    public desc: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public async addPermissions(permission: PermissionDBObject[]): Promise<void> {
        const permissions = permission.map(p => ({ RoleId: this.id, PermissionId: p.id }));
        let res = await connection.models.RolePermission.bulkCreate(permissions);
    }
}

RoleDBObject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    name: {type: DataTypes.STRING},
    desc: {type: DataTypes.STRING}
}, {modelName:'Role', timestamps:true, sequelize:connection, paranoid:true})

export default RoleDBObject