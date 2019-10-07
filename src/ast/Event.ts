import Node from "../Node";
import Tokenizer from "../Tokenizer";

export default class Event extends Node {
  title: string = "";
  repeating: boolean = false;
  daysOfWeek: string[] = [];
  date: string = "";
  allDay: boolean = false;
  fromTime: string = "";
  toTime: string = "";
  location: string = "";
  guests: string[] = [];

  parse(tokenizer: Tokenizer): void {
    this.title = tokenizer.getNext();
    if (tokenizer.getAndCheckNext("every")) {
      this.repeating = true;
      do {
        let dayOfWeek: string = tokenizer.getNext();
        this.daysOfWeek.push(dayOfWeek);
      } while (tokenizer.getAndCheckNext("and"))
    } else if (tokenizer.getAndCheckNext("on")) {
      this.repeating = false;
      this.date = tokenizer.getNext();
    }

    if (tokenizer.getAndCheckNext("all day")) {
      this.allDay = true;
    } else if (tokenizer.getAndCheckNext("from")) {
      this.allDay = false;
      this.fromTime = tokenizer.getNext();
      tokenizer.getAndCheckNext("to");
      this.toTime = tokenizer.getNext();
    }

    // stub for locations
    if (tokenizer.getAndCheckNext("at")) {

    }

    // stub for guests
    if (tokenizer.getAndCheckNext("with")) {

    }
  }

  evaluate(): void {
    // TODO
  }

  nameCheck(): void {
    // TODO
  }

  typeCheck(): void {
    // TODO
  }
}
