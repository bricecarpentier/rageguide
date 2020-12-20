import { container } from "tsyringe";

import ISuggestionRepository from "./suggestions/domain/ISuggestionRepository.ts";
import SuggestionRepositoryInMemory from "./suggestions/infrastructure/SuggestionRepositoryInMemory.ts";

// prettier-ignore
container
  .register<ISuggestionRepository>("ISuggestionRepository", { useClass: SuggestionRepositoryInMemory });

export default container;
