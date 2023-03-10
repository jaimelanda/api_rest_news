import { Router } from "express";
import * as authController from "../controllers/auth.controller"
const router = Router()
import { verifySignup } from "../middlewares";


router.post('/signup',[verifySignup.checkExistingUser,verifySignup.checkExistingRole],authController.signup)
router.post('/signin',authController.signin)

export default router;