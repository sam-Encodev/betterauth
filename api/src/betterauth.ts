import { config } from "./config";
import { client, db } from "./db";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const server = config.server.uri;
const origin = config.auth.origin;

if (!server) {
  throw new Error("Server utl is not configured");
}

if (!origin) {
  throw new Error("Origin is not configured");
}

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
  baseURL: String(server),
  trustedOrigins: [String(origin)],
  telemetry: {
    enabled: true,
  },
  logger: {
    disabled: false,
    disableColors: false,
    level: "error",
    log: (level, message, ...args) => {

      console.log(`[${level}] ${message}`, ...args);
    },
  },
  session: {
    modelName: "session",
    fields: {
      userId: "user_id",
    },
    expiresIn: 604800,
    updateAge: 86400,
    disableSessionRefresh: true,
    additionalFields: {
      customField: {
        type: "string",
      },
    },
    storeSessionInDatabase: true,
    preserveSessionInDatabase: false,
    cookieCache: {
      enabled: true,
      maxAge: 3000
    },
  },
});


export { origin }