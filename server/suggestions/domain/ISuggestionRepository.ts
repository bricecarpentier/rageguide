import Suggestion from "./Suggestion.ts";

export default interface ASuggestionRepository {
  save(suggestion: Suggestion): Promise<Suggestion>;
}
