import { stub, Stub } from "@testing/mocks";
import describe from "@utils/testing/describe.ts";
import { assert, assertThrowsAsync } from "@testing/asserts";
import Suggestion from "../domain/Suggestion.ts";
import ASuggestionRepository from "../domain/ASuggestionRepository.ts";
import ReceiveSuggestion from "./ReceiveSuggestion.ts";

const d = (usecase: string, label: string) =>
  describe("ReceiveSuggestion", usecase, label);

class TestSuggestionRepository extends ASuggestionRepository {
  save(suggestion: Suggestion): Promise<Suggestion> {
    return Promise.resolve(suggestion);
  }
}

Deno.test({
  name: d("when saving succeeds", "returns a suggestion"),
  async fn() {
    const command = new ReceiveSuggestion(new TestSuggestionRepository());
    const actualSuggestion = await command.exec({ id: "id", label: "label" });
    assert(
      actualSuggestion instanceof Suggestion,
      "actualSuggestion is not a Suggestion instance"
    );
  },
});

Deno.test({
  name: d("when saving fails", "throws the error"),
  async fn() {
    const repository = new TestSuggestionRepository();
    const stubSaveFn = () => {
      throw new Error("saving failed");
    };
    const stubSave = stub(repository, "save", stubSaveFn);
    try {
      const command = new ReceiveSuggestion(repository);
      const fn = async () => {
        await command.exec({ id: "id", label: "label" });
      };
      await assertThrowsAsync(fn, Error, "saving failed");
    } finally {
      stubSave.restore();
    }
  },
});
