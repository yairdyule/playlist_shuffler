import express, { Application, IRoute } from "express";
import { Routes } from "./routes";
import { Wares } from "./wares";

const app: Application = express();

for (const ware of Wares) {
  app.use(ware);
}

for (const route of Routes) {
  app.use(route.path, route.router);
}

app.listen(8000, () => console.log("app listening on http://localhost:8000"));
