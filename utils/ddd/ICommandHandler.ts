import type { CommandSchema } from "./CommandSchema.ts";

export default interface ICommandHandler {
  willHandle(type: string): boolean;
  handle(command: CommandSchema): Promise<unknown>;
}
