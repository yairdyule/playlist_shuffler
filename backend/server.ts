import express, { Application, IRoute } from "express";
import { routes } from "./routes";
const app: Application = express();

for (const route of routes) {
  app.use(route.path, route.router);
}

app.listen(8000, () => console.log("app listening on http://localhost:8000"));
