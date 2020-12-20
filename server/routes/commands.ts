import { Request, Response, Toolkit } from "pogo";
import z from "zod";
import ACommandDispatcher from "@utils/ddd/ACommandDispatcher.ts";
import { CommandSchema } from "@utils/ddd/CommandSchema.ts";
import readAsJSON from "@utils/pogo/readAsJSON.ts";

type Commands = z.ZodSchema<CommandSchema>;

export default class HandleCommands {
  private commands: Commands;
  private dispatcher: ACommandDispatcher;

  constructor(commands: Commands, dispatcher: ACommandDispatcher) {
    this.commands = commands;
    this.dispatcher = dispatcher;
  }

  async handle(request: Request, h: Toolkit): Promise<Response> {
    const body = await readAsJSON(request.body);
    const command = this.commands.parse(body);
    await this.dispatcher.dispatch(command);
    return h.response("ok");
  }
}
