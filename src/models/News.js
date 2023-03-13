import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: String,
    description: String,
    published: String,
    img: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("News", newsSchema);
