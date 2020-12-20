import AConfigFactory from "./AConfigFactory.ts";
import type { Config } from "./Config.ts";
import { InvalidValueError, ValueOutOfBoundsError } from "./errors.ts";

type DenoEnv = typeof Deno.env;
type EnvObject = { [index: string]: string };

const parsePort = (env: EnvObject, key: string): number => {
  const value = env.PORT;
  if (typeof value === "undefined") return 0;
  const v = parseInt(value, 10);
  if (isNaN(v)) {
    throw new InvalidValueError(key, value);
  }
  if (v < 0 || v > 65535) {
    throw new ValueOutOfBoundsError(key, value, ["0", "65535"]);
  }
  return v;
};

export default class EnvConfigFactory extends AConfigFactory {
  constructor(private env: DenoEnv) {
    super();
  }

  build(): Config {
    const obj = this.env.toObject();
    return {
      hostname: obj?.HOSTNAME ?? "127.0.0.1",
      port: parsePort(obj, "PORT"),
    };
  }
}
