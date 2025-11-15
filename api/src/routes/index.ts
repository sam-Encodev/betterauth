import express from "express";
import { errorHandler } from "../middlewares/error";
import { healthz, home, unknownRoute } from "../controllers/home";

const router = express.Router();
router.get("/", home);
router.get("/healthz", healthz);
router.use(errorHandler);
router.get("/*w", unknownRoute);

export { router };
