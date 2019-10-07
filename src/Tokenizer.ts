import * as fs from "fs";
import * as path from "path";
import { ParserError } from "./errors/ParserError";

export default class Tokenizer {
  program: string;
  literals: Array<string> = [
    "Start",
    "Events:",
    "every",
    "and",
    "on",
    "all day",
    "from",
    "at",
    "with",
    "Done",
    "End"
  ];
  tokens: string[] = [];
  currentTokenIdx: number = 0;
  line: number = 1;
  column: number = 0;

  constructor(fileName: string) {
    try {
      this.program = fs
        .readFileSync(path.join(__dirname, "../", fileName))
        .toString("utf-8");
    } catch (err) {
      throw new ParserError(`Unable to load source: ${fileName}`);
    }
    this.tokenize();
  }

  private tokenize() {
    // Repalce all new lines with keyword
    let tokenizedProgram = this.program.replace(/\r?\n|\r/g, "_NEWLINE_");

    // Add underscores around each literal
    this.literals.forEach(literal => {
      tokenizedProgram = tokenizedProgram.replace(literal, `_${literal}_`);
    });

    // Remove extra spacing around each token
    tokenizedProgram = tokenizedProgram.replace(/[ ]+/g, "");

    // Create token list by spliting on underscores
    let tokenList = tokenizedProgram.split(/[_]+/g);

    // Remove first and last items from token list (they are empty strings)
    tokenList = tokenList.slice(1, tokenList.length - 1);

    this.tokens = tokenList;

    console.log(tokenizedProgram);
    console.log(tokenList);
  }

  public top(): string | null {
    // TODO: This code has yet to be verified
    if (this.currentTokenIdx < this.tokens.length) {
      // ignore blank lines
      while ("NEWLINE" === this.tokens[this.currentTokenIdx]) {
        this.currentTokenIdx += 1;
        this.line += 1;
        this.column = 0;
      }

      return this.tokens[this.currentTokenIdx];
    }

    return null;
  }

  public pop(): string | null {
    // TODO: This code has yet to be verified
    if (this.top() != null) {
      let token = this.tokens[this.currentTokenIdx];
      this.currentTokenIdx += 1;
      this.column += 1;
      return token;
    }
    return null;
  }

  public hasNext(): boolean {
    // TODO: This code has yet to be verified
    return this.top() !== null;
  }

  public getLine(): number {
    return this.line;
  }
}
