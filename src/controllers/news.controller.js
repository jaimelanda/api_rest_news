import News from "../models/News";

import { renameSync } from "fs";
import { extname } from "path";

export const createNews = async (req, res) => {
  try {
    const { title, summary, description, published } = req.body;
    const img = req.files.map((file) => file.filename);
    const newNews = new News({ title, summary, description, published, img });
    const newsSaved = await newNews.save();
    res.status(201).json(newsSaved);
  } catch (error) {
    console.log("mostrando algun error", error);
  }
};

export const getNews = async (req, res) => {
  const news = await News.find();
  res.status(200).json(news);
};
export const getNewsById = async (req, res) => {
  const news = await News.findById(req.params.newsId);
  res.status(200).json(news);
};

// export const updateNewsById = async (req, res) => {
//   const updatedNews = await News.findByIdAndUpdate(
//     req.params.newsId,
//     req.body,
//     { new: true }
//   );
//   res.status(200).json(updatedNews);
// };

export const updateNewsById = async (req, res) => {
  try {
    const updatedNews = await News.findById(req.params.newsId);

    if (!updatedNews) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    updatedNews.title = req.body.title;
    updatedNews.summary = req.body.summary;
    updatedNews.description = req.body.description;
    updatedNews.published = req.body.published;

    const newImages = req.files.map((file) => file.filename);
    updatedNews.img = newImages;

    const savedNews = await updatedNews.save();
    res.status(200).json(savedNews);
  } catch (error) {
    console.log("mostrando algun error", error);

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteNews = async (req, res) => {
  const deletedNews = await News.findByIdAndDelete(req.params.newsId);
  res.status(204).json();
};
