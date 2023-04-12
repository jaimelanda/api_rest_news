import News from "../models/News";
import fs from "fs";
import path from "path";

export const createNews = async (req, res) => {
    try {
        const {title, summary, description, published} = req.body;
        const img = req.files.map((file) => file.filename);
        const newNews = new News({title, summary, description, published, img});
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
    console.log("res newsId", res.newsId)
        const news = await News.findById(req.params.newsId).catch(error=>{
        console.log("error")
        return {error}
    });
    res.status(200).json(news);
};

export const updateNewsById = async (req, res) => {
    try {
        const updatedNews = await News.findById(req.params.newsId);

        if (!updatedNews) {
            return res.status(404).json({message: "Noticia no encontrada"});
        }
        updatedNews.title = req.body.title;
        updatedNews.summary = req.body.summary;
        updatedNews.description = req.body.description;
        updatedNews.published = req.body.published;
        const imgupload =req.files.map((file) => file.filename);
        const imgUpdate = req.body.img.split(",")
        const imgPermanent = []
        updatedNews.img.forEach(im=>{
            if(!imgUpdate.some(i=>i===im)){
                console.log("eliminando", im)
                const pathImg = path.join(__dirname, '..',"..", 'uploads', im);
                fs.unlink(pathImg , (err) => {
                    if (err) {
                        console.log("error deleteing file", err)
                    }
                });

            }else{
                console.log("agreadno", im)
                imgPermanent.push(im)
            }
        })
        console.log("updatedNews.img", updatedNews.img)
        updatedNews.img = [...imgPermanent,...imgupload]
        console.log("updatedNews.img", updatedNews.img)
        const savedNews = await updatedNews.save();
        res.status(200).json(savedNews);
    } catch (error) {
        console.log("mostrando algun error", error);

        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const deleteNews = async (req, res) => {
    const deletedNews = await News.findByIdAndDelete(req.params.newsId);
    res.status(204).json();
};

export const deleteSource = (req,res)=>{
    console.log("req.params.path",req.params.path)
    try {
        fs.unlink(req.params.path , (err) => {
            if (err) {
                throw err;
            }

            console.log("Delete File successfully.");
            res.status(200).json();
        });

    }catch (error){
        console.log(error)
        res.status(500).json()
    }
}
