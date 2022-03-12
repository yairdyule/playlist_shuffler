import { Router } from "express";
import { IRoute } from "../types";

const router = Router();

router.get("/", async (req, res) => {
  res.redirect("index.html");
});

export const ServerRouter: IRoute = {
  router: router,
  path: "/",
};
