import ASuggestionRepository from "@suggestions/domain/ASuggestionRepository.ts";
import Suggestion from "../domain/Suggestion.ts";

type ReceiveSuggestionParams = {
  id: string;
  label: string;
};

export default class ReceiveSuggestion {
  private repository: ASuggestionRepository;

  constructor(repository: ASuggestionRepository) {
    this.repository = repository;
  }

  async exec(params: ReceiveSuggestionParams): Promise<Suggestion> {
    const suggestion = await this.repository.save(new Suggestion(params));
    return suggestion;
  }
}
