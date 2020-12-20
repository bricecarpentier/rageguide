import ACommandDispatcher from "./ACommandDispatcher.ts";
import { CommandSchema } from "./CommandSchema.ts";
import ICommandHandler from "./ICommandHandler.ts";

const willHandle = (type: string) => (handler: ICommandHandler) =>
  handler.willHandle(type);

const handle = (command: CommandSchema) => (handler: ICommandHandler) =>
  handler.handle(command);

export default class CommandDispatcher extends ACommandDispatcher {
  private handlers: ICommandHandler[] = [];

  constructor(handlers: ICommandHandler[]) {
    super();
    this.handlers = handlers;
  }

  register(handler: ICommandHandler): ACommandDispatcher {
    return new CommandDispatcher([...this.handlers, handler]);
  }

  async dispatch(command: CommandSchema): Promise<void> {
    const { type } = command;
    const handlers = this.handlers.filter(willHandle(type));
    await Promise.allSettled(handlers.map(handle(command)));
    return;
  }
}
