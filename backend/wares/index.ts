import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const domainsFromEnv = process.env.WHITELISTED_URL;
const whitelist = domainsFromEnv?.split(",").map((item) => item.trim());
console.log(whitelist);

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist?.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export const ExpressUrlEncoding = express.urlencoded({ extended: true });
export const ExpressJSON = express.json();
export const CorsOptions = cors(corsOptions);

export const Wares = [CorsOptions, ExpressJSON, ExpressUrlEncoding];
