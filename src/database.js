import mongoose from "mongoose";

import Role, {ROLES} from "./models/Role"

export async function connectDatabase() {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

export async function createRoles() {
    const count = await Role.estimatedDocumentCount()
    if (count > 0) return;
    await Promise.all(ROLES.map((name) => new Role({name}).save()))
}
