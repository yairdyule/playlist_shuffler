import { Router } from "express";
import path from "path";
import { IRoute } from "../types";

const router = Router();

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

export const ServerRouter: IRoute = {
  router: router,
  path: "/",
};
