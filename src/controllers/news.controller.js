import News from "../models/News"

export const createNews = async(req,res)=>{
    const {title, description,status,imgURL}= req.body
    const newNews = new News({title,description,status,imgURL});
    const newsSaved = await newNews.save();
    res.status(201).json(newsSaved)
}
export const getNews = async(req,res)=>{
    const news = await News.find();
    res.status(200).json(news)

}
export const getNewsById = async(req,res)=>{
    const news =  await News.findById(req.params.newsId)
    res.status(200).json(news)

}
export const updateNewsById =async(req,res)=>{
    const updatedNews = await News.findByIdAndUpdate(req.params.newsId,req.body,{new: true})
    res.status(200).json(updatedNews)

}
export const deleteNews =async(req,res)=>{
    const deletedNews = await News.findByIdAndDelete(req.params.newsId)
    res.status(204).json();
}