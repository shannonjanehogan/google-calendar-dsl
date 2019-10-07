import Tokenizer from "../Tokenizer";
import Event from "./Event";
import Node from "../Node";
import { ParserError } from "../errors/ParserError";

export default class Events extends Node {
  events: Event[] = [];
  
  parse(tokenizer: Tokenizer): void {
    let currentLine = tokenizer.getLine();
    let token = tokenizer.pop();
    if (token !== "Events:") {
      throw new ParserError(`Error at line ${currentLine}: expected keyword [Events:] but got [${token}]`);
    }
    while (tokenizer.top() !== "Done") {
      let event: Event = new Event();
      event.parse(tokenizer);
      this.events.push(event);
    }
    currentLine = tokenizer.getLine();
    token = tokenizer.pop()
    if (token !== "Done") {
      throw new ParserError(`Error at line ${currentLine}: expected keyword [Done] but got [${token}]`);
    }
  }

  evaluate(): void {
    for (let event of this.events) {
      event.evaluate();
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
