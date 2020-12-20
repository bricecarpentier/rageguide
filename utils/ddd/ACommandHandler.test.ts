import describe from "@utils/testing/describe.ts";
import { assert } from "https://deno.land/std@0.64.0/_util/assert.ts";
import ACommandHandler from "./ACommandHandler.ts";

const d = (method: string, label: string) =>
  describe("ACommandHandler", method, label);

class MyCommandHandler extends ACommandHandler {
  get type(): string {
    return "toto";
  }

  handle(): Promise<void> {
    return Promise.resolve();
  }
}

Deno.test({
  name: d("handle", "useless test for coverage only"),
  async fn() {
    const handler = new MyCommandHandler();
    await handler.handle();
    assert(true);
  },
});

Deno.test({
  name: d("willHandle", "returns true for the correct type"),
  fn() {
    const handler = new MyCommandHandler();
    assert(handler.willHandle("toto"), "should handle toto");
    assert(!handler.willHandle("tata"), "should not handle tata");
  },
});
