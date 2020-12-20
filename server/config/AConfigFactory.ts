import type { Config } from "./Config.ts";

export default abstract class AConfigFactory {
  abstract build(): Config;
}
