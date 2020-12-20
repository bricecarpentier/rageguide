import { stub } from "@testing/mocks";
import describe from "@utils/testing/describe.ts";
import { assert, assertThrowsAsync } from "std/testing/asserts.ts";
import Suggestion from "../domain/Suggestion.ts";
import ASuggestionRepository from "../domain/ASuggestionRepository.ts";
import { ReceiveSuggestion } from "./ReceiveSuggestion.ts";
import ReceiveSuggestionHandler from "./ReceiveSuggestionHandler.ts";

const d = (method: string, usecase: string, label: string) =>
  describe("ReceiveSuggestion", method, usecase, label);

class TestSuggestionRepository extends ASuggestionRepository {
  save(suggestion: Suggestion): Promise<Suggestion> {
    return Promise.resolve(suggestion);
  }
}

Deno.test({
  name: d("willHandle", "when called with 'ReceiveSuggestion'", "returns true"),
  fn() {
    // @ts-expect-error I'm lazy and this is a test file
    const handler = new ReceiveSuggestionHandler(null);
    assert(
      handler.willHandle("ReceiveSuggestion"),
      "handler will not handle ReceiveSuggestion"
    );
  },
});

Deno.test({
  name: d("willHandle", "when called with 'FAKE'", "returns false"),
  fn() {
    // @ts-expect-error I'm lazy and this is a test file
    const handler = new ReceiveSuggestionHandler(null);
    assert(!handler.willHandle("FAKE"), "handler will handle FAKE");
  },
});

Deno.test({
  name: d("handle", "when saving succeeds", "returns a suggestion"),
  async fn() {
    const repository = new TestSuggestionRepository();
    const handler = new ReceiveSuggestionHandler(repository);
    const command: ReceiveSuggestion = {
      type: "ReceiveSuggestion",
      payload: { id: "id", label: "label" },
    };
    const actualSuggestion = await handler.handle(command);
    assert(
      actualSuggestion instanceof Suggestion,
      "actualSuggestion is not a Suggestion instance"
    );
  },
});

Deno.test({
  name: d("handle", "when saving fails", "throws the error"),
  async fn() {
    const repository = new TestSuggestionRepository();
    const stubSaveFn = () => {
      throw new Error("saving failed");
    };
    const stubSave = stub(repository, "save", stubSaveFn);
    try {
      const handler = new ReceiveSuggestionHandler(repository);
      const command: ReceiveSuggestion = {
        type: "ReceiveSuggestion",
        payload: { id: "id", label: "label" },
      };
      const fn = async () => {
        await handler.handle(command);
      };
      await assertThrowsAsync(fn, Error, "saving failed");
    } finally {
      stubSave.restore();
    }
  },
});
