import Tokenizer from "../Tokenizer";
import Node from "../Node";
import Guest from "./Guest";
import { ParserError } from "../errors/ParserError";
import { TokenKeywords } from "../TokenKeywords";

export default class Guests extends Node {
  guests: Guest[] = [];

  parse(tokenizer: Tokenizer): void {
    let currentLine = tokenizer.getLine();
    let token = tokenizer.pop();

    while(tokenizer.top() !== TokenKeywords.DONE) { 
      let guest: Guest = new Guest(); 
      guest.parse(tokenizer); 
      this.guests.push(guest); 
    }
    currentLine = tokenizer.getLine();
    token = tokenizer.pop(); // KEYWORD: DONE
    if (token !== TokenKeywords.DONE) {
      throw new ParserError(`expected keyword [${TokenKeywords.DONE}] but got [${token}]`, currentLine);
    }
    console.log("Guests:", this.guests);
  }

  evaluate(context: object[]): void {
    for (let guest of this.guests) {
      guest.evaluate(context);
    }
  }

  nameCheck(): void {
    for (let guest of this.guests) {
      guest.nameCheck();
    }
  }
  typeCheck(): void {
    for (let guest of this.guests) {
      guest.typeCheck();
    }
  }
}