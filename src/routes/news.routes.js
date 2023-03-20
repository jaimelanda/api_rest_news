import { Router } from "express";
import multer from "multer";

import * as newsController from "../controllers/news.controller";
import { authJwt } from "../middlewares";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin, upload.array("images")],
  newsController.createNews
);
router.get("/", newsController.getNews);
router.get("/:newsId", newsController.getNewsById);
router.put(
  "/:newsId",
  [authJwt.verifyToken, authJwt.isAdmin],
  newsController.updateNewsById
);
router.delete(
  "/:newsId",
  [authJwt.verifyToken, authJwt.isAdmin],
  newsController.deleteNews
);

export default router;
