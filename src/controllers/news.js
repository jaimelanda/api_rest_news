import fs from "fs";
import News from "../models/News.js";

const {UPLOADS_DIR} = process.env

export const createNews = async (req, res) => {
    const {title, summary, description, published} = req.body;
    try {
        const imgs = req.files.map((file) => file.filename);
        const newNews = new News({title, summary, description, published, img: imgs});
        const newsSaved = await newNews.save();
        res.status(201).json(newsSaved);
    } catch (error) {
        console.log("error al crear noticias", error);
    }
};

export const getNews = async (req, res) => {
    const news = await News.find();
    res.status(200).json(news);
};
export const getNewsById = async (req, res) => {
    const {newsId} = req.params;
    const news = await News.findById(newsId).catch((error) => {
        console.log("error");
        return {error};
    });
    res.status(200).json(news);
};

export const updateNewsById = async (req, res) => {
    const {newsId} = req.params;
    try {
        let newsDB = await News.findById(newsId);
        if (!newsDB) {
            return res.status(404).json({message: "noticia no encontrada"});
        }
        const noticia = req.body;
        const urls = noticia.urls || [];
        delete noticia.urls;
        Object.assign(newsDB, noticia);
        const images = [];
        const imagesDB = newsDB.img;
        for (const image of imagesDB) {
            if (urls.includes(image)) {
                images.push(image);
            } else {
                fs.unlinkSync(`${UPLOADS_DIR}/${image}`);
            }
        }
        for (const image of req.files.map((file) => file.filename)) {
            images.push(image);
        }
        newsDB.img = images;
        const newsSaved = await newsDB.save();

        res.status(200).json(newsSaved);
    } catch (error) {
        console.log("mostrando algún error", error);

        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const deleteNews = async (req, res) => {
    const {newsId} = req.params;

    try {
        let newsDB = await News.findById(newsId);
        if (!newsDB) {
            return res.status(404).json({message: "noticia no encontrada"});
        }
        newsDB.img.forEach((image) => {
            fs.unlinkSync(`${UPLOADS_DIR}/${image}`);
        });

        await News.findByIdAndDelete(newsId);
        res.status(204).json();
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error del servidor"});
    }
};
