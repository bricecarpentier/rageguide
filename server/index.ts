import pogo from "pogo";
import CommandDispatcher from "../utils/ddd/CommandDispatcher.ts";
import getServerInformation from "../utils/pogo/getServerInformation.ts";
import startServer from "../utils/pogo/startServer.ts";
import EnvConfigFactory from "./config/EnvConfigFactory.ts";
import container from "./dependencies.ts";
import HandleCommands from "./routes/commands.ts";
import { commands } from "./suggestions/application/mod.ts";
import ReceiveSuggestionHandler from "./suggestions/application/ReceiveSuggestionHandler.ts";

const config = new EnvConfigFactory(Deno.env).build();
const server = pogo.server({ hostname: config.hostname, port: config.port });

// prettier-ignore
const handlers = [
  ReceiveSuggestionHandler,
].map((token) => container.resolve(token));
const dispatcher = new CommandDispatcher(handlers);

const commandsRoute = new HandleCommands(commands, dispatcher);

server.router.post("/commands", commandsRoute.handle.bind(commandsRoute));

const addr = startServer(server);
console.log("Listening for requests on ", getServerInformation(addr));
