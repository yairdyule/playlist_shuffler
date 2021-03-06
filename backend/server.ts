import express, { Application } from "express";
import { Routes } from "./routes";
import { Wares } from "./wares";

const app: Application = express();

for (const ware of Wares) {
  app.use(ware);
}

for (const route of Routes) {
  app.use(route.path, route.router);
}

export const server = app.listen(process.env.PORT || 8000);
