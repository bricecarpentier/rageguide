import { assert } from "std/testing/asserts.ts";
import describe from "@utils/testing/describe.ts";
import Suggestion, { SuggestionData } from "./Suggestion.ts";

const d = (method: string, label: string) =>
  describe("Suggestion", method, label);

const makeSuggestion = (obj: Partial<SuggestionData>) =>
  new Suggestion({
    id: obj.id ?? "suggestion",
    label: "a label",
  });

Deno.test({
  name: d("equals", "compares on id"),
  fn() {
    const s1 = makeSuggestion({ id: "one", label: "label" });
    const s2 = makeSuggestion({ id: "two", label: "label" });
    assert(!s1.equals(s2), "s1 equals s2");
    const s3 = makeSuggestion({ id: "one", label: "label2" });
    assert(s1.equals(s3), "s1 does not equal s3");
  },
});
