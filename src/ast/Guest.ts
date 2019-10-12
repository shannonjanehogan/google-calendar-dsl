import Node from "../Node";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";
import { TokenKeywords } from "../TokenKeywords";

export default class Guest extends Node {
  id: string = "";  
  name: string = ""; 
  email: string = ""; 
  
  parse(tokenizer: Tokenizer): void {  // i.e.: JC is Jeremy Chiu with jeremy@chiu.org  
    this.lineNumber = tokenizer.getLine(); 
    let token = tokenizer.pop();
    if (token === null) {
      throw new ParserError("expected a guest id", this.lineNumber);
    }
    this.id  = token; 
    
    token = tokenizer.pop();
    if (token !== TokenKeywords.IS) {
      throw new ParserError(`expected keyword [${TokenKeywords.IS}] but got [${token}]`,this.lineNumber);
    }

    token = tokenizer.pop(); 
    if (token === null) {
      throw new ParserError("expected a guest name", this.lineNumber);
    }
    this.name = token; 

    token = tokenizer.pop();
    if (token!== TokenKeywords.WITH) {
      throw new ParserError(`expected keyword [${TokenKeywords.WITH}] but got [${token}]`,this.lineNumber);
    }

    token = tokenizer.pop(); 
    if (token === null) {
      throw new ParserError("expected a guest name", this.lineNumber);
    }
    this.email = token; 
  } 
  evaluate(context: object[]): void {
    throw new Error("Method not implemented.");
  }
  nameCheck(): void {
    throw new Error("Method not implemented.");
  }
  typeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

