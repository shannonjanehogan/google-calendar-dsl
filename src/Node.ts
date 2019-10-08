import Tokenizer from "./Tokenizer";
import { ParserError } from "./errors/ParserError";

export default abstract class Node {
  names: string[] = [];
  types: object = {};
  lineNumber: number = 0;
  abstract parse(tokenizer: Tokenizer): void;
  abstract evaluate(): void;
  abstract nameCheck(): void;
  abstract typeCheck(): void;
}
