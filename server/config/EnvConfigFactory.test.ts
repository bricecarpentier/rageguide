import { assertEquals, assertThrows } from "std/testing/asserts.ts";
import describe from "@utils/testing/describe.ts";
import { stub } from "@testing/mocks";
import EnvConfigFactory from "./EnvConfigFactory.ts";
import { InvalidValueError, ValueOutOfBoundsError } from "./errors.ts";
const d = (usecase: string, label: string) =>
  describe("EnvConfigFactory", usecase, label);

const mockToObject = (obj: Record<string, string>) => () => obj;

Deno.test({
  name: d("port", "returns 0 if not present"),
  fn() {
    const stubTO = stub(Deno.env, "toObject", mockToObject({}));
    try {
      const factory = new EnvConfigFactory(Deno.env);
      const config = factory.build();
      assertEquals(config.port, 0);
    } finally {
      stubTO.restore();
    }
  },
});

Deno.test({
  name: d("port", "returns the value of PORT cast as a number if present"),
  fn() {
    const stubTO = stub(Deno.env, "toObject", mockToObject({ PORT: "3000" }));
    try {
      const factory = new EnvConfigFactory(Deno.env);
      const config = factory.build();
      assertEquals(config.port, 3000);
    } finally {
      stubTO.restore();
    }
  },
});

Deno.test({
  name: d(
    "port",
    "throws if the value of PORT cannot be converted to an number"
  ),
  fn() {
    const stubTO = stub(Deno.env, "toObject", mockToObject({ PORT: "maman" }));
    try {
      const factory = new EnvConfigFactory(Deno.env);
      assertThrows(
        () => factory.build(),
        InvalidValueError,
        "maman is not a suitable value for PORT"
      );
    } finally {
      stubTO.restore();
    }
  },
});

Deno.test({
  name: d("port", "throws if the value of PORT is lesser than 0"),
  fn() {
    const stubTO = stub(Deno.env, "toObject", mockToObject({ PORT: "-5" }));
    try {
      const factory = new EnvConfigFactory(Deno.env);
      assertThrows(
        () => factory.build(),
        ValueOutOfBoundsError,
        "-5 does not fit the bounds for PORT (0, 65535)"
      );
    } finally {
      stubTO.restore();
    }
  },
});

Deno.test({
  name: d("port", "throws if the value of PORT is greater than 65535"),
  fn() {
    const stubTO = stub(Deno.env, "toObject", mockToObject({ PORT: "65536" }));
    try {
      const factory = new EnvConfigFactory(Deno.env);
      assertThrows(
        () => factory.build(),
        ValueOutOfBoundsError,
        "65536 does not fit the bounds for PORT (0, 65535)"
      );
    } finally {
      stubTO.restore();
    }
  },
});
