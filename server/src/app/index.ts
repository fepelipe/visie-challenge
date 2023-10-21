import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import logger from "./logger";
import router from "../routes/v1/router";

const app = express();
app.options("*", cors());
app.use(bodyParser.json());
app.use(logger);
app.use("/api/v1", router);
app.use(cors());

export default app;
