import ASuggestionRepository from "@suggestions/domain/ASuggestionRepository.ts";
import ACommandHandler from "@utils/ddd/ACommandHandler.ts";
import Suggestion from "../domain/Suggestion.ts";
import type { ReceiveSuggestion } from "./ReceiveSuggestion.ts";

export default class ReceiveSuggestionHandler extends ACommandHandler {
  public readonly type: string = "ReceiveSuggestion";
  private repository: ASuggestionRepository;

  constructor(repository: ASuggestionRepository) {
    super();
    this.repository = repository;
  }

  async handle(command: ReceiveSuggestion): Promise<Suggestion> {
    const { payload } = command;
    const suggestion = await this.repository.save(new Suggestion(payload));
    return suggestion;
  }
}
