import { CommandSchema } from "./CommandSchema.ts";
import ICommandHandler from "./ICommandHandler.ts";

export default abstract class ACommandHandler implements ICommandHandler {
  abstract get type(): string;

  willHandle(type: string): boolean {
    return type === this.type;
  }

  abstract handle(command: CommandSchema): Promise<unknown>;
}
