import { Router } from "express";
const router = Router();

import * as userController from "../controllers/user.controller.js";
import * as authJwt  from "../middlewares/authJwt.js";
import * as verifySignup from "../middlewares/verifySignup.js";
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkExistingRole],
  userController.createUser
);

export default router;
