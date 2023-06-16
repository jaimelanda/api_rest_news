import * as jwt from "../libs/jwt";
import Role, {ROLES} from "../models/Role.js";
import User from "../models/User.js";

export const createUser = async (req, res) => {
    try {
        const {username, email, password, roles} = req.body;

        let userFound = await User.findOne({username});
        if (userFound)
            return res.status(400).json({message: "The user already exists"});

        userFound = await User.findOne({email});
        if (userFound)
            return res.status(400).json({message: "The email already exists"});

        if (!roles) return res.status(400).json({message: "No roles"});
        for (const role of roles) {
            if (!ROLES.includes(role)) return res.status(400).json({
                message: `Role ${role[i]} does not exist`,
            });
        }
        const foundRoles = await Role.find({name: {$in: roles}});
        // creating a new User
        const user = new User({
            username,
            email,
            password: await User.encryptPassword(password),
            roles: foundRoles.map((role) => role._id),
        });

        // saving the new user
        const savedUser = await user.save();
        if (req.user) {
            res.status(200).json({
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                roles: savedUser.roles,
            });
        } else {
            const token = jwt.sign(savedUser._id);
            return res.status(200).json({token});
        }

    } catch (error) {
        res.status(500).json({message: error.message});
        console.error(error);
    }
};
