import {Router} from "express";
import * as userController from "../controllers/users.js";
import * as authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post(
    "/",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    userController.createUser
);

export default router;
