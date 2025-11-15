import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { auth, origin } from "./betterauth";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";

const app = express();
app.use(
  cors({
    origin: String(origin),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

export { app };
