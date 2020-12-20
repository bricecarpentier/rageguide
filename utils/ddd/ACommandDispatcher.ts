import { CommandSchema } from "./CommandSchema.ts";
import ICommandHandler from "./ICommandHandler.ts";

export default abstract class ACommandDispatcher {
  abstract register(handler: ICommandHandler): ACommandDispatcher;
  abstract dispatch(command: CommandSchema): Promise<void>;
}
