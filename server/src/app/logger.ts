import { RequestHandler } from "express";

const logger: RequestHandler = async (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

export default logger;
