import bodyParser from "body-parser";
import express from "express";
import logger from "./logger";
import router from "../routes/v1/router";

const app = express();
app.use(bodyParser.json());
app.use(logger);
app.use("/api/v1", router);

export default app;
