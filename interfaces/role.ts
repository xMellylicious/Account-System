/*
    __  __                 _                 _  _  _  _
   |  \/  | __ _  _ _  ___| |_   _ __   ___ | || || || |
   | |\/| |/ _` || '_|(_-/|   \ | '  \ / -_)| || | \_. |
   |_|  |_|\__/_||_|  /__/|_||_||_|_|_|\___||_||_| |__/
      MADE BY MELLY SOFTWARE. ALL RIGHTS PRESERVED.
*/

import { DataTypes, Model, Optional } from "sequelize"

export interface IRoleType {
    id:Number;
    name:string;
    desc:string;
    createdAt?:Date;
    updatedAt?:Date;
    deletedAt?:Date;
}

export interface IRoleTypeInput extends Optional<IRoleType, 'id'> {}
export interface IRoleTypeOutput extends Required<IRoleType> {}
