const formatRoles = async (roles) => {
    roles.map(role => {
        delete role["dataValues"]["UserRole"]
    })

    return roles
}

const formatUser = async (user) => {
    return {
        isBanned:user.isBanned,
        id:user.id,
        username:user.username,
        roles:await formatRoles(user.UserRoles)
    }
}

const formatRole = async(role) => {
    return {
        name:role.name,
        desc:role.desc,
        permissions:role.RolePermissions
    }
}

export {formatUser, formatRole}