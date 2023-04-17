import app from "./app.js";
import "./database.js";
const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
