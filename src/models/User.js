import {Schema,model} from "mongoose";
const bcrypt =require ('bcryptjs');

const userSchema = new Schema(
    {
        username: {
        type: String,
        unique: true,
        },
        email: {
        type: String,
        unique: true,
        },
        password: {
        type: String,
        required: true,
        },
        roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role",
        },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password,salt)
};
userSchema.statics.comparePassword = async(password,receivedPassword)=>{
    return await bcrypt.compare(password,receivedPassword)
}

export default model("User", userSchema);