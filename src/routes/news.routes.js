import { Router } from "express";
const router = Router()

import * as newsController from '../controllers/news.controller'
import { authJwt } from "../middlewares";


router.post('/',[authJwt.verifyToken,authJwt.isAdmin],newsController.createNews)
router.get('/',newsController.getNews)
router.get('/:newsId',newsController.getNewsById)
router.put('/:newsId',[authJwt.verifyToken,authJwt.isAdmin],newsController.updateNewsById)
router.delete('/:newsId',[authJwt.verifyToken,authJwt.isAdmin],newsController.deleteNews)

export default router;