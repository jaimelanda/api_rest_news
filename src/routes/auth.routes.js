import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
const router = Router();
import *as verifySignup from "../middlewares/verifySignup.js";

router.post(
  "/signup",
  [verifySignup.checkExistingUser, verifySignup.checkExistingRole],
  authController.signup
);
router.post("/signin", authController.signin);

export default router;
