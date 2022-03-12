import express, { Application, IRoute } from "express";
import { Routes } from "./routes";
import { Wares } from "./wares";
import path from "path";

const app: Application = express();

for (const ware of Wares) {
  app.use(ware);
}

for (const route of Routes) {
  app.use(route.path, route.router);
}

app.use(express.static(path.join(__dirname, "../frontend/build")));

export const server = app.listen(process.env.PORT || 8000);
