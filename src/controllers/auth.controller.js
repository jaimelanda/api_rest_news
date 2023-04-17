import User from "../models/User.js";
import Role from "../models/Role.js";
import Jwt from "jsonwebtoken";
import SECRET from "../config.js";
export const signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    const hash = await User.encryptPassword(password);
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    const token = Jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 60000,
    });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const signin = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!userFound) return res.status(400).json({ message: "user no found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const token = Jwt.sign({ id: userFound._id }, SECRET, { expiresIn: 60000 });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
