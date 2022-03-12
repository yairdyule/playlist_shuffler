import { Router } from "express";
import { IRoute } from "../types";

const router = Router();

router.get("/", async (req, res) => {
  res.sendFile("index.html");
});

export const ServerRouter: IRoute = {
  router: router,
  path: "/",
};
