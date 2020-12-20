import { assertEquals } from "@testing/asserts";
import describe from "./describe.ts";

Deno.test({
  name:
    "describe >> separates the last label from the rest with double chevron",
  fn() {
    assertEquals(
      describe("MyClass", "should do something"),
      "MyClass >> should do something"
    );
  },
});

Deno.test({
  name: "describe >> separate the other labels with double-colons",
  fn() {
    assertEquals(
      describe("MyClass", "method", "should do something"),
      "MyClass::method >> should do something"
    );
  },
});
