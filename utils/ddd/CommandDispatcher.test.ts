import { assertEquals } from "std/testing/asserts.ts";
import describe from "@utils/testing/describe.ts";
import { spy, Spy } from "@testing/mocks";
import CommandDispatcher from "./CommandDispatcher.ts";
import ICommandHandler from "./ICommandHandler.ts";
import { CommandSchema } from "./CommandSchema.ts";

const d = (method: string, label: string) =>
  describe("CommandDispatcher", method, label);

class MyCommandHandler implements ICommandHandler {
  constructor(public type: string, public spy: Spy<void>) {}

  willHandle(type: string) {
    return type === this.type;
  }

  handle(command: CommandSchema): Promise<void> {
    this.spy(command);
    return Promise.resolve();
  }
}

Deno.test({
  name: d("dispatch", "will call the handle method of all matching handlers"),
  async fn() {
    const handleToto1 = new MyCommandHandler("toto", spy());
    const handleToto2 = new MyCommandHandler("toto", spy());
    const handleTata = new MyCommandHandler("tata", spy());
    const dispatcher = new CommandDispatcher([
      handleToto1,
      handleToto2,
      handleTata,
    ]);
    const totoCommand = { type: "toto", payload: {} };
    await dispatcher.dispatch(totoCommand);
    assertEquals(handleToto1.spy.calls.length, 1);
    assertEquals(handleToto1.spy.calls[0].args, [totoCommand]);
    assertEquals(handleToto2.spy.calls.length, 1);
    assertEquals(handleToto2.spy.calls[0].args, [totoCommand]);
    assertEquals(handleTata.spy.calls.length, 0);
    const tataCommand = { type: "tata", payload: {} };
    await dispatcher.dispatch(tataCommand);
    assertEquals(handleToto1.spy.calls.length, 1);
    assertEquals(handleToto2.spy.calls.length, 1);
    assertEquals(handleTata.spy.calls.length, 1);
    assertEquals(handleTata.spy.calls[0].args, [tataCommand]);
  },
});

Deno.test({
  name: d("register", "returns a dispatcher with the added handler"),
  async fn() {
    const handler1 = new MyCommandHandler("toto", spy());
    const handler2 = new MyCommandHandler("toto", spy());
    const dispatcher = new CommandDispatcher([handler1]).register(handler2);
    const command = { type: "toto", payload: {} };
    await dispatcher.dispatch(command);
    assertEquals(handler1.spy.calls.length, 1);
    assertEquals(handler2.spy.calls.length, 1);
  },
});
