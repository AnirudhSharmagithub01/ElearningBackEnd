import { Redis } from "ioredis";
require("dotenv").config();

const redisConnect = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis Connected");
    return process.env.REDIS_URL;
  }
  throw new Error("Redis connection is Failed");
};

export default redisConnect;
