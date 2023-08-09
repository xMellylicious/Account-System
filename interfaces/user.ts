/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import { DataTypes, Model, Optional } from "sequelize"

export interface IUserType {
    id:Number;
    isBanned:Boolean;
    firstname?:String;
    surname?:String;
    username:String;
    email:String;
    permissionLevel:Number;
    password:String;
    createdAt?:Date;
    updatedAt?:Date;
    deletedAt?:Date;
}

export interface IUserTypeInput extends Optional<IUserType, 'id'> {}
export interface IUserTypeOutput extends Required<IUserType> {}
