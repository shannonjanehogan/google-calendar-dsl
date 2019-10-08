import * as fs from "fs";
import * as path from "path";
import { ParserError } from "./errors/ParserError";
import { TokenKeywords } from "./TokenKeywords";

export default class Tokenizer {
  program: string;
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
    // Replace all new lines with keyword
    let tokenizedProgram = this.program.replace(/\r?\n|\r/g, "$$$$NEWLINE$$$$");

    // Add double dollar signs around each keyword
    Object.values(TokenKeywords).forEach(literal => {
      tokenizedProgram = tokenizedProgram.replace(new RegExp(`\\b${literal}\\b(?=([^"]*"[^"]*")*[^"]*$)`, "g"), `$$$$${literal}$$$$`);
    });

    // Remove extra spacing around each token
    tokenizedProgram = tokenizedProgram.replace(/[ ]{2,}/g, " ");

    // Remove double quote marks that escaped strings
    tokenizedProgram = tokenizedProgram.replace(/"/g, "");

    // Create token list by spliting on double (or more) dollar signs
    let tokenList = tokenizedProgram.split(/[\$]{2,}/g);
    tokenList = tokenList.map(token => token.trim());

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
