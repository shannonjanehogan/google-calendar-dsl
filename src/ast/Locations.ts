import Tokenizer from "../Tokenizer";
import Node from "../Node";
import Location from "./Location";
import { ParserError } from "../errors/ParserError";
import { TokenKeywords } from "../TokenKeywords";

export default class Locations extends Node {
  locations: Location[] = [];

  parse(tokenizer: Tokenizer): void {
    let currentLine = tokenizer.getLine();
    let token = tokenizer.pop();

    while(tokenizer.top() !== TokenKeywords.DONE) { 
      let location: Location = new Location(); 
      location.parse(tokenizer); 
      this.locations.push(location); 
    }
    currentLine = tokenizer.getLine();
    token = tokenizer.pop();

    if (token !== TokenKeywords.DONE) {
      throw new ParserError(`expected keyword [${TokenKeywords.DONE}] but got [${token}]`, currentLine);
    }
    console.log("Locations:", this.locations);
  }

  evaluate(context: object[]): void {
    for (let location of this.locations) {
      location.evaluate(context);
    }
  }

  nameCheck(): void {
    for (let location of this.locations) {
      location.nameCheck();
    }
  }
  typeCheck(): void {
    for (let location of this.locations) {
      location.typeCheck();
    }
  }
}