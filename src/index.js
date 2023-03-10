import app from "./app";
import './database'
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
