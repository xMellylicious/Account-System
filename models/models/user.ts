/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import { DataTypes, IntegerDataType, Model, Optional } from "sequelize"
import connection from "../connection"
import { IUserTypeInput, IUserType } from "../../interfaces/user"
import RoleDBObject from "./role";

class UserDBObject extends Model<IUserType, IUserTypeInput> implements IUserType {
    public isBanned: boolean;
    public id: number;
    public firstname?: string;
    public surname?: string;
    public username: string;
    public email: string;
    public permissionLevel: number;
    public password:String;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    //Custom Methods
    public async addRoles(role: RoleDBObject[]): Promise<void> {
        const userRoles = role.map(role => ({ UserId: this.id, RoleId: role.id }));
        await connection.models.UserRole.bulkCreate(userRoles);
    }
}

UserDBObject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    isBanned: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },

    firstname: {
        type:DataTypes.STRING,
        allowNull: false,
    },

    surname: {
        type:DataTypes.STRING,
        allowNull: false,
    },

    username: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: "column"
    },

    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: "column"
    },

    password: {
        type:DataTypes.STRING,
        allowNull: false,
    },
}, {timestamps:true, sequelize:connection, paranoid:true})

export default UserDBObject