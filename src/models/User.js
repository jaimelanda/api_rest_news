import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.statics.encryptPassword =  (password) => {
  const salt =  bcrypt.genSaltSync(8);
  return  bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword =  (password, receivedPassword) => {
  return  bcrypt.compareSync(password, receivedPassword);
};

export default model("User", userSchema);
