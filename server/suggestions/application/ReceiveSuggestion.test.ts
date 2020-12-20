import { assert } from "std/testing/asserts.ts";
import describe from "@utils/testing/describe.ts";
import { schema } from "./ReceiveSuggestion.ts";

const d = (label: string) => describe("ReceiveSuggestion", label);

Deno.test({
  name: d("validates expected"),
  fn() {
    const obj = {
      type: "ReceiveSuggestion",
      payload: {
        id: "maman",
        label: "papa",
      },
    };
    const parsed = schema.safeParse(obj);
    assert(parsed.success, "object could not be parsed");
  },
});

Deno.test({
  name: d("rejects different name"),
  fn() {
    const obj = {
      type: "ReceiveSuggestionFAIL",
      payload: {
        id: "maman",
        label: "papa",
      },
    };
    const parsed = schema.safeParse(obj);
    assert(!parsed.success, "object was unexpectedly parsed");
  },
});

Deno.test({
  name: d("rejects empty payload"),
  fn() {
    const obj = {
      type: "ReceiveSuggestion",
      payload: {},
    };
    const parsed = schema.safeParse(obj);
    assert(!parsed.success, "object was unexpectedly parsed");
  },
});
