import * as jwt from "../libs/jwt.js"
import Role from "../models/Role.js";
import User from "../models/User.js";

export async function verifyToken(req, res, next) {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({message: "no token provided"});
        const decoded = jwt.verify(token);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({message: "user no found"});
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

export function hasRole(check) {
    return async function (req, res, next) {
        if (!req.user || !req.user.roles) {
            return res.status(403).json({message: "User roles not found"});
        }

        const roles = await Role.find({_id: {$in: req.user.roles}});
        for (const role of roles) if (role.name === check) return next();
        return res.status(403).json({message: "Required role admin"});

    }

}

export const isAdmin = hasRole("admin")


