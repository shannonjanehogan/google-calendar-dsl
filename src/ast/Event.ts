import Node from "../Node";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";

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
    if (token === "every") {
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
      while (token === "and") {
        tokenizer.pop();
        currentLine = tokenizer.getLine();
        token = tokenizer.pop();
        if (token === null || !Event.validDays.includes(token)) {
          throw new ParserError(
            `Error on line ${currentLine}: expected a day of the week`
          );
        }
      }
    } else if (token === "on") {
      this.repeating = false;
      currentLine = tokenizer.getLine();
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError(`Error on line ${currentLine}: expected a date`);
      }
      this.date = token;
    } else {
      throw new ParserError(
        `Error on line ${currentLine}: expected keyword [every] or [on] but got [${token}]`
      );
    }

    // Get what should be the start and end time of the event
    currentLine = tokenizer.getLine();
    token = tokenizer.pop();
    if (token === "all day") {
      this.allDay = true;
    } else if (token === "from") {
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
      if (token !== "to") {
        throw new ParserError(
          `Error on line ${currentLine}: expected keyword [to] but got [${token}]`
        );
      }
      currentLine = tokenizer.getLine();
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError(
          `Error on line ${currentLine}: expected a start time`
        );
      }
      this.toTime = token;
    } else {
      throw new ParserError(
        `Error on line ${currentLine}: expected keyword [all day] or [from] but got [${token}]`
      );
    }

    // stub for locations
    currentLine = tokenizer.getLine();
    token = tokenizer.top();
    if (token === "at") {
    }

    // stub for guests
    currentLine = tokenizer.getLine();
    token = tokenizer.top();
    if (token === "with") {
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
