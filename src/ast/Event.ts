import Node from "../Node";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";
import { TypeCheckError } from "../errors/TypeCheckError";
import { TokenKeywords } from "../TokenKeywords";

export default class Event extends Node {
  static readonly validDays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
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
    // Get what should be the title of the event
    this.lineNumber = tokenizer.getLine();
    let token = tokenizer.pop();
    if (token === null) {
      throw new ParserError("expected an event title", this.lineNumber);
    }
    this.title = token;

    // Get what should be the date of the event
    token = tokenizer.pop();
    if (token === TokenKeywords.EVERY) {
      this.repeating = true;
      token = tokenizer.pop();
      if (token === null || !Event.validDays.includes(token)) {
        throw new ParserError("expected a day of the week", this.lineNumber);
      }
      let dayOfWeek: string = token;
      this.daysOfWeek.push(dayOfWeek);
      token = tokenizer.top();
      // loop over ("and" DAYOFWEEK)* tokens
      // TODO: clean this up
      while (token === TokenKeywords.AND) {
        tokenizer.pop();
        token = tokenizer.pop();
        if (token === null || !Event.validDays.includes(token)) {
          throw new ParserError("expected a day of the week", this.lineNumber);
        }
        this.daysOfWeek.push(token);
      }
    } else if (token === TokenKeywords.ON) {
      this.repeating = false;
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError("expected a date", this.lineNumber);
      }
      this.date = token;
    } else {
      throw new ParserError(
        `expected keyword [${TokenKeywords.EVERY}] or [${TokenKeywords.ON}] but got [${token}]`,
        this.lineNumber
      );
    }

    // Get what should be the start and end time of the event
    token = tokenizer.pop();
    if (token === TokenKeywords.ALL_DAY) {
      this.allDay = true;
    } else if (token === TokenKeywords.FROM) {
      this.allDay = false;
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError("expected a start time", this.lineNumber);
      }
      this.fromTime = token;
      token = tokenizer.pop();
      if (token !== TokenKeywords.TO) {
        throw new ParserError(
          `expected keyword [${TokenKeywords.TO}] but got [${token}]`,
          this.lineNumber
        );
      }
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError("expected an end time time", this.lineNumber);
      }
      this.toTime = token;
    } else {
      throw new ParserError(
        `expected keyword [${TokenKeywords.ALL_DAY}] or [${TokenKeywords.FROM}] but got [${token}]`,
        this.lineNumber
      );
    }

    // stub for locations
    token = tokenizer.top();
    if (token === TokenKeywords.AT) {
    }

    // stub for guests
    token = tokenizer.top();
    if (token === TokenKeywords.WITH) {
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
