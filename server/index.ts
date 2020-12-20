import pogo from "pogo";
import CommandDispatcher from "../utils/ddd/CommandDispatcher.ts";
import getServerInformation from "../utils/pogo/getServerInformation.ts";
import startServer from "../utils/pogo/startServer.ts";
import EnvConfigFactory from "./config/EnvConfigFactory.ts";
import HandleCommands from "./routes/commands.ts";
import { commands } from "./suggestions/application/mod.ts";
import ReceiveSuggestionHandler from "./suggestions/application/ReceiveSuggestionHandler.ts";
import SuggestionRepositoryInMemory from "./suggestions/infrastructure/SuggestionRepositoryInMemory.ts";

const config = new EnvConfigFactory(Deno.env).build();
const server = pogo.server({ hostname: config.hostname, port: config.port });

const dispatcher = new CommandDispatcher([
  new ReceiveSuggestionHandler(new SuggestionRepositoryInMemory()),
]);

const commandsRoute = new HandleCommands(commands, dispatcher);

server.router.post("/commands", commandsRoute.handle.bind(commandsRoute));

const addr = startServer(server);
console.log("Listening for requests on ", getServerInformation(addr));
