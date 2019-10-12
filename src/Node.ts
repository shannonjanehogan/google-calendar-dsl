import Tokenizer from "./Tokenizer";

export default abstract class Node {
  lineNumber: number = 0;
  abstract parse(tokenizer: Tokenizer): void;
  abstract evaluate(context: object[]): void;
  abstract nameCheck(): void;
  abstract typeCheck(): void;
}
