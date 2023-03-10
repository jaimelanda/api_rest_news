import mongoose from "mongoose";
mongoose
  .connect("mongodb://127.0.0.1/apicompany", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Db in connected"))
  .catch((error) => console.log(error));
