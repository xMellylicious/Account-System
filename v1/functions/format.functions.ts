const formatUser = async (user) => {
    return {
        id:user.id,
        username:user.username,
    }
}

export {formatUser}