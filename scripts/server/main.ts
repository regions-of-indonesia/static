import { createAdaptorServer } from "@hono/node-server";

const serve = async () => {
  const app = (await import("./app")).default;

  const server = createAdaptorServer({ fetch: app.fetch });

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
