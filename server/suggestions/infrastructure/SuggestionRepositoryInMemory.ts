import ASuggestionRepository from "../domain/ASuggestionRepository.ts";
import Suggestion from "../domain/Suggestion.ts";

export default class SuggestionRepositoryInMemory extends ASuggestionRepository {
  private suggestions: Record<string, Suggestion> = {};

  save(suggestion: Suggestion): Promise<Suggestion> {
    this.suggestions[suggestion.id] = suggestion;
    console.log(this.suggestions);
    return Promise.resolve(suggestion);
  }
}
