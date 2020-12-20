import { Inject, Injectable } from "tsyringe";
import ISuggestionRepository from "@suggestions/domain/ISuggestionRepository.ts";
import ACommandHandler from "@utils/ddd/ACommandHandler.ts";
import Suggestion from "../domain/Suggestion.ts";
import type { ReceiveSuggestion } from "./ReceiveSuggestion.ts";

@Injectable()
export default class ReceiveSuggestionHandler extends ACommandHandler {
  public readonly type: string = "ReceiveSuggestion";

  // prettier-ignore
  constructor(@Inject("ISuggestionRepository") private repository: ISuggestionRepository) {
    super();
  }

  async handle(command: ReceiveSuggestion): Promise<Suggestion> {
    const { payload } = command;
    const suggestion = await this.repository.save(new Suggestion(payload));
    return suggestion;
  }
}
