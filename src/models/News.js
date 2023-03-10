import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            },
        description: String,
        publishe: String,
        imgURL: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("News", newsSchema);
