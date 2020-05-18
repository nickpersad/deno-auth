import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { MONGO_URI } from "../config.ts";

let _db: any;

export const mongo = async () => {
    if (typeof _db === "undefined") {
        // Connect To Mongo
        // Initialize the plugin
        await init();
        const client = new MongoClient();
        client.connectWithUri(MONGO_URI);
        _db = client.database("test");   
    }
    return _db;
};