import app from "./app";
import "./database";
const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
