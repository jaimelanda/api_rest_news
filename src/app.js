import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createRoles } from "./libs/initialSetup.js";
import newsRoutes from "./routes/news.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import contactUsRouter from "./routes/contactUs.routes.js";

const app = express();
createRoles();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    name: "jaime",
    author: "autorjaime",
    description: "description",
  });
});

app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/contactus", contactUsRouter);

export default app;
