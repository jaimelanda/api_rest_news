import {Router} from "express";

import * as authController from "../controllers/auth.js";
import * as userController from "../controllers/users.js"

const router = Router();

router.post("/signup", userController.createUser);
router.post("/signin", authController.signin);

export default router;
