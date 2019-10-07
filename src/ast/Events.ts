import Tokenizer from "../Tokenizer";
import Event from "./Event";

export default class Events extends Node {
  events: Event[] = [];
  
  parse(tokenizer: Tokenizer): void {
    tokenizer.getAndCheckNext("Events:")
    while (!tokenizer.checkToken("Done")) {
      let event: Event = new Event();
      event.parse(tokenizer);
      this.events.push(event);
    }
    tokenizer.getAndCheckNext("Done");
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
