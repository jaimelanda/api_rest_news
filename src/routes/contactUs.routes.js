import {Router} from "express";
import {createContactUs} from "../controllers/contactUs.controller.js";
const router = Router();
router.post("/", createContactUs)
export default router;