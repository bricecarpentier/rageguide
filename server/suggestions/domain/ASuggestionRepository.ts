import Suggestion from "./Suggestion.ts";

export default abstract class ASuggestionRepository {
  abstract save(suggestion: Suggestion): Promise<Suggestion>;
}
