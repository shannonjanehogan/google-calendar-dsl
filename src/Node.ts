import Tokenizer from "./Tokenizer";

export default abstract class Node {
  names: string[] = [];
  types: object = {};
  abstract parse(tokenizer: Tokenizer): void;
  abstract evaluate(context: object[]): void;
  abstract nameCheck(): void;
  abstract typeCheck(): void;
}
