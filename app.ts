import express, { NextFunction, Response, Request } from "express";
export const app = express();
import cors from "cors";
import cookieparser from "cookie-parser";
require("dotenv").config();
import { ErrorMiddleware } from "./middlewares/error";


// body-Parser
app.use(express.json({ limit: "50mb" }));

// cookie-parser
app.use(cookieparser());

// cors => cross origin resourses sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working",
  });
});

app.use(ErrorMiddleware);
