import { createAdaptorServer } from "@hono/node-server";

const serve = async () => {
  console.time("app");
  const create = (await import("./app")).default;
  console.timeEnd("app");

  const { logger } = await import("hono/logger");

  const server = createAdaptorServer({ fetch: create((app) => app.use("*", logger())).fetch });

  const port = 8100;
  const hostname = "0.0.0.0";

  try {
    server.on("listening", () => {
      console.log(`[regions-of-indonesia]: ${hostname}:${port}`);
    });

    server.listen(port, hostname);

    return server;
  } catch (error) {
    console.error(error);
  }
};

serve();
