import cors from "cors";
import express from "express";
import "express-async-errors";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import contactUsRouter from "./routes/contactUs.js";
import newsRoutes from "./routes/news.js";
import userRouter from "./routes/users.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(process.env.UPLOADS_DIR));

app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/contactus", contactUsRouter);

export default app;
