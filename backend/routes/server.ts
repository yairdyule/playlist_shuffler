import { Router } from "express";
import { IRoute } from "../types";
import { returnToFrontend } from "../utils";

const router = Router();

router.get("/", async (_req, res) => {
  // res.sendFile(path.join(__dirname, "../frontend/index.html"));
  returnToFrontend(res)
});

export const ServerRouter: IRoute = {
  router: router,
  path: "/",
};
