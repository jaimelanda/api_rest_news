import {Router} from "express";
import {createContactUs} from "../controllers/contactUs.js";

const router = Router();
router.post("/", createContactUs);
export default router;
