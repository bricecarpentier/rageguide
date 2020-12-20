import { Server } from "pogo";

const startServer = (server: Server): Deno.Addr => {
  server.start();
  const rawServer = server.raw;
  if (!rawServer) {
    throw new Error("could not get server information");
  }
  const addr = rawServer.listener.addr;
  return addr;
};

export default startServer;
