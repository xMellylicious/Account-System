/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import { DataTypes, Model, Optional } from "sequelize"

export interface IPermissionType {
    id:Number;
    name:string;
    createdAt?:Date;
    updatedAt?:Date;
    deletedAt?:Date;
}

export interface IPermissionTypeInput extends Optional<IPermissionType, 'id'> {}
export interface IPermissionTypeOutput extends Required<IPermissionType> {}
