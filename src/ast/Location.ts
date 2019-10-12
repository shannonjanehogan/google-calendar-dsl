import Node from "../Node";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";
import { TokenKeywords } from "../TokenKeywords";

export default class Location extends Node {
  id: string = "";  
  address: string = ""; 
  
  parse(tokenizer: Tokenizer): void {
    this.lineNumber = tokenizer.getLine(); 
    let token = tokenizer.pop(); 
    if (token === null) {
      throw new ParserError("expected a location ID", this.lineNumber);
    }
    this.id = token; 
    
    token = tokenizer.pop();
    if (token !== TokenKeywords.IS) {
      throw new ParserError(`expected keyword [${TokenKeywords.IS}] but got [${token}]`, this.lineNumber);
    }

    token = tokenizer.pop(); 
    if (token === null) {
      throw new ParserError("expected a location address", this.lineNumber);
    }
    this.address = token;
    
  }  evaluate(context: object[]): void {
    throw new Error("Method not implemented.");
  }
  nameCheck(): void {
    throw new Error("Method not implemented.");
  }
  typeCheck(): void {
    throw new Error("Method not implemented.");
  }
}

