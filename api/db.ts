import { config } from "./config";
import { MongoClient } from "mongodb";

const dburl = config.database.url;
const dbname = config.database.name;

if (!dburl) {
    throw new Error("Database URL is not configured");
}

if (!dbname) {
    throw new Error("Database name is not configured");
}

const client = new MongoClient(dburl);
async function run() {
    try {
        await client.connect();
        await client.db(dbname).command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");
    } finally {

    }
}

run().catch(console.dir);
const db = client.db();

export { db, client }