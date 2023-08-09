const formatUser = async (user) => {
    return {
        isBanned:user.isBanned,
        id:user.id,
        username:user.username,
    }
}

export {formatUser}