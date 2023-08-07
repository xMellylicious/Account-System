/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import { DataTypes, Model, Optional } from "sequelize"
import connection from "../connection"
import { IUserTypeInput, IUserType } from "../../interfaces/user"

class UserDBObject extends Model<IUserType, IUserTypeInput> implements IUserType {
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
}

UserDBObject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    
    firstname: {
        type:DataTypes.STRING
    },

    surname: {
        type:DataTypes.STRING
    },

    username: {
        type:DataTypes.STRING
    },

    email: {
        type:DataTypes.STRING
    },

    permissionLevel: {
        type:DataTypes.STRING
    },

    password: {
        type:DataTypes.STRING
    },
}, {timestamps:true, sequelize:connection, paranoid:true})

export default UserDBObject