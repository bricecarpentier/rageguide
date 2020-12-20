import IEqualable from "@utils/IEqualable.ts";

export interface SuggestionData {
  id: string;
  label: string;
}

export default class Suggestion implements IEqualable {
  readonly id: string;
  readonly label: string;

  constructor(data: SuggestionData) {
    this.id = data.id;
    this.label = data.label;
  }

  equals(obj: unknown): boolean {
    return obj instanceof Suggestion && this.id === obj.id;
  }
}
