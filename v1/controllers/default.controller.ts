import { config } from "../../config"

const displayHealth = async (req, res) => {
    try {
        res.status(200).json({
            message:`${config.branding.name} is Operational`,
            appUptime:process.uptime(),
            osUptime:require("os").uptime(),
            version:config["version"]
        })
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}

export {displayHealth}