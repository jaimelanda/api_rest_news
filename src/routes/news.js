import {Router} from "express";
import multer from "multer";

import * as newsController from "../controllers/news.js";
import * as authMiddleware from "../middlewares/auth"

const router = Router();

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, process.env.UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
router.post(
    "/",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    upload.array("images"),
    newsController.createNews
);
router.get("/", newsController.getNews);

router.get("/:newsId", newsController.getNewsById);

router.put(
    "/:newsId",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    upload.array("images"),
    newsController.updateNewsById
);

router.delete(
    "/:newsId",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    newsController.deleteNews
);

export default router;
