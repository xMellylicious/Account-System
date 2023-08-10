/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import { DataTypes, Model, Optional } from "sequelize"
import connection from "../connection"
import { IPermissionType, IPermissionTypeInput } from "../../interfaces/permission"

class PermissionDBObject extends Model<IPermissionType, IPermissionTypeInput> implements IPermissionType {
    public id: number;
    public name: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

PermissionDBObject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    name: {type: DataTypes.STRING, unique:"column"},
}, {modelName:'Permission', timestamps:true, sequelize:connection, paranoid:true})

export default PermissionDBObject