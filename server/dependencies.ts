import { container } from "tsyringe";

import ISuggestionRepository from "./suggestions/domain/ISuggestionRepository.ts";
import SuggestionRepositoryInMemory from "./suggestions/infrastructure/SuggestionRepositoryInMemory.ts";

container.register<ISuggestionRepository>("ISuggestionRepository", {
  useClass: SuggestionRepositoryInMemory,
});

export default container;
