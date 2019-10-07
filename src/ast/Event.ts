import Node from "../Node";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";
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
    let currentLine = tokenizer.getLine();
    let token = tokenizer.pop();
    if (token === null) {
      throw new ParserError(
        `Error on line ${currentLine}: expected an event title`
      );
    }
    this.title = token;

    // Get what should be the date of the event
    currentLine = tokenizer.getLine();
    token = tokenizer.pop();
    if (token === TokenKeywords.EVERY) {
      this.repeating = true;
      token = tokenizer.pop();
      if (token === null || !Event.validDays.includes(token)) {
        throw new ParserError(
          `Error on line ${currentLine}: expected a day of the week`
        );
      }
      let dayOfWeek: string = token;
      this.daysOfWeek.push(dayOfWeek);
      token = tokenizer.top();
      // loop over ("and" DAYOFWEEK)* tokens
      // TODO: clean this up
      while (token === TokenKeywords.AND) {
        tokenizer.pop();
        currentLine = tokenizer.getLine();
        token = tokenizer.pop();
        if (token === null || !Event.validDays.includes(token)) {
          throw new ParserError(
            `Error on line ${currentLine}: expected a day of the week`
          );
        }
      }
    } else if (token === TokenKeywords.ON) {
      this.repeating = false;
      currentLine = tokenizer.getLine();
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError(`Error on line ${currentLine}: expected a date`);
      }
      this.date = token;
    } else {
      throw new ParserError(
        `Error on line ${currentLine}: expected keyword [${TokenKeywords.EVERY}] or [${TokenKeywords.ON}] but got [${token}]`
      );
    }

    // Get what should be the start and end time of the event
    currentLine = tokenizer.getLine();
    token = tokenizer.pop();
    if (token === TokenKeywords.ALL_DAY) {
      this.allDay = true;
    } else if (token === TokenKeywords.FROM) {
      this.allDay = false;
      currentLine = tokenizer.getLine();
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError(
          `Error on line ${currentLine}: expected a start time`
        );
      }
      this.fromTime = token;
      currentLine = tokenizer.getLine();
      token = tokenizer.pop();
      if (token !== TokenKeywords.TO) {
        throw new ParserError(
          `Error on line ${currentLine}: expected keyword [${TokenKeywords.TO}] but got [${token}]`
        );
      }
      currentLine = tokenizer.getLine();
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError(
          `Error on line ${currentLine}: expected an end time`
        );
      }
      this.toTime = token;
    } else {
      throw new ParserError(
        `Error on line ${currentLine}: expected keyword [${TokenKeywords.ALL_DAY}] or [${TokenKeywords.FROM}] but got [${token}]`
      );
    }

    // stub for locations
    currentLine = tokenizer.getLine();
    token = tokenizer.top();
    if (token === TokenKeywords.AT) {
    }

    // stub for guests
    currentLine = tokenizer.getLine();
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
