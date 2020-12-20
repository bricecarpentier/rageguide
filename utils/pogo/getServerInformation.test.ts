import describe from "@utils/testing/describe.ts";
import { assertEquals, assertThrows } from "std/testing/asserts.ts";
import getServerInformation from "./getServerInformation.ts";

const d = (usecase: string, label: string) =>
  describe("getServerInformation", usecase, label);

Deno.test({
  name: d("called with a UnixAddr", "returns the expected string"),
  fn() {
    const addr: Deno.UnixAddr = {
      transport: "unix",
      path: "blah/toto.sock",
    };
    assertEquals(getServerInformation(addr), "unix://blah/toto.sock");
  },
});

Deno.test({
  name: d("called with a NetAddr", "returns the expected string"),
  fn() {
    const addr: Deno.NetAddr = {
      transport: "tcp",
      hostname: "localhost",
      port: 3000,
    };
    assertEquals(getServerInformation(addr), "http://localhost:3000");
  },
});

Deno.test({
  name: d("called with an unknown transport", "throws"),
  fn() {
    const addr: Deno.UnixAddr = {
      // @ts-expect-error this is a test
      transport: "FAKE",
    };
    assertThrows(
      () => {
        getServerInformation(addr);
      },
      Error,
      "unrecognized transport"
    );
  },
});
