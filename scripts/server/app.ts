import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";

import { base } from "../config";

const app = new Hono();

app.use("*", cors({ origin: "*" }));

app.use(`/${base}/*`, serveStatic({ root: "./dist" }));

app
  .get("/", (ctx) => {
    return ctx.body("regions-of-indonesia");
  })
  .notFound((ctx) => {
    return ctx.body("Not found", 404);
  })
  .onError((err, ctx) => {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    let message = "Internal server error";

    if (err instanceof Error) {
      message = err.message;
    }

    return ctx.body(message, 500);
  });

export default app;
