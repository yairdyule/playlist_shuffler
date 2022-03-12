import { IRoute } from "../types";
import { SpotifyRouter } from "./spotify";
import { ServerRouter } from "./server";

export const Routes: IRoute[] = [SpotifyRouter, ServerRouter];
