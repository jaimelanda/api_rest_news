import * as jwt from "../libs/jwt";
import User from "../models/User.js";

export async function signin(req, res) {
    const {email, password} = req.body
    try {
        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({message: "user no found"});

        const matchPassword = User.comparePassword(password, userFound.password);
        if (!matchPassword)
            return res.status(401).json({token: null, message: "Invalid password"});

        const token = jwt.sign(userFound._id);
        res.json({token});
    } catch (error) {
        console.log(error);
    }
}
