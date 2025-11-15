import { config } from "./config";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const dburl = config.database.url;
const dbname = config.database.name;
const origin = config.auth.origin;

if (!dburl) {
  throw new Error("Database URL is not configured");
}

if (!dbname) {
  throw new Error("Database name is not configured");
}

if (!origin) {
  throw new Error("Origin is not configured");
}

const client = new MongoClient(dburl);
async function run() {
  try {
    await client.connect();
    await client.db(dbname).command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [
    admin()
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  trustedOrigins: [String(origin)],
  telemetry: {
    enabled: true,
  },
  logger: {
    disabled: false,
    disableColors: false,
    level: "error",
    log: (level, message, ...args) => {
      // Custom logging implementation
      console.log(`[${level}] ${message}`, ...args);
    },
  },
  session: {
    modelName: "session",
    fields: {
      userId: "user_id",
    },
    expiresIn: 604800, // 7 days
    updateAge: 86400, // 1 day
    disableSessionRefresh: true,
    additionalFields: {
      customField: {
        type: "string",
      },
    },
    storeSessionInDatabase: true, // Store session in database when secondary storage is provided (default: `false`)
    preserveSessionInDatabase: false, // Preserve session records in database when deleted from secondary storage (default: `false`)
    cookieCache: {
      enabled: true, // Enable caching session in cookie (default: `false`)
      maxAge: 3000, // 5 minutes
    },
  },
});