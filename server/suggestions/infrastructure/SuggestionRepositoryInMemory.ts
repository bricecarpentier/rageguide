import { Injectable } from "tsyringe";
import ISuggestionRepository from "../domain/ISuggestionRepository.ts";
import Suggestion from "../domain/Suggestion.ts";

@Injectable()
export default class SuggestionRepositoryInMemory
  implements ISuggestionRepository {
  private suggestions: Record<string, Suggestion> = {};

  save(suggestion: Suggestion): Promise<Suggestion> {
    this.suggestions[suggestion.id] = suggestion;
    console.log(this.suggestions);
    return Promise.resolve(suggestion);
  }
}
