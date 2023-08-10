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

class UserRole extends Model {}

UserRole.init({
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserDBObjects',
            key: 'id'
        }
    },

    RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'RoleDBObjects',
            key: 'id'
        }
    },
}, {modelName:'UserRole', timestamps:false, sequelize:connection})

export default UserRole