import Tokenizer from "../Tokenizer";
import Event from "./Event";
import Node from "../Node";
import { ParserError } from "../errors/ParserError";
import { TokenKeywords } from "../TokenKeywords";

export default class Events extends Node {
  events: Event[] = [];

  parse(tokenizer: Tokenizer): void {
    let currentLine = tokenizer.getLine();
    let token = tokenizer.pop();
    // note: not sure if this error is needed because programs now has a switch statement, so it wouldn't get here if token wasn't EVENTS? 
    if (token !== TokenKeywords.EVENTS) {
      throw new ParserError(
        `Error at line ${currentLine}: expected keyword [${TokenKeywords.EVENTS}] but got [${token}]`
      );
    }
    while (tokenizer.top() !== TokenKeywords.DONE) {
      let event: Event = new Event();
      event.parse(tokenizer);
      this.events.push(event);
    }
    currentLine = tokenizer.getLine();
    token = tokenizer.pop();
    if (token !== TokenKeywords.DONE) {
      throw new ParserError(
        `Error at line ${currentLine}: expected keyword [${TokenKeywords.DONE}] but got [${token}]`
      );
    }

    console.log("Events:", this.events);
  }

  evaluate(context: object[]): void {
    for (let event of this.events) {
      event.evaluate(context);
    }
  }

  nameCheck(): void {
    for (let event of this.events) {
      event.nameCheck();
    }
  }

  typeCheck(): void {
    for (let event of this.events) {
      event.typeCheck();
    }
  }
}
