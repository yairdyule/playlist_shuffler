import { Router } from "express";
import { IRoute } from "../types";

const router = Router();

// route: /spotify/
router.get("/", async (req, res) => {
  res.redirect("/spotify/auth");
});

export const ServerRouter: IRoute = {
  router: router,
  path: "/",
};
