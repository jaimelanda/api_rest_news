import "dotenv/config"

import app from "./app.js";
import {connectDatabase, createRoles} from "./database.js";

async function main() {
    await connectDatabase();
    await createRoles();

    const port = Number(process.env.PORT);
    app.listen(port, () => {
        console.log(`Backend app listening on port ${port}`);
    });
}

main().catch(console.error)
