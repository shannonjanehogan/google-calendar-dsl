import moment from "moment";

import Node from "../Node";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";
import { TypeCheckError } from "../errors/TypeCheckError";
import { TokenKeywords } from "../TokenKeywords";
import { NameCheckError } from "../errors/NameCheckError";

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
      if (token === null) {
        throw new ParserError("expected a day of the week", this.lineNumber);
      }
      this.daysOfWeek.push(token);
      token = tokenizer.top();
      // loop over ("and" DAYOFWEEK)* tokens
      // TODO: clean this up
      while (token === TokenKeywords.AND) {
        tokenizer.pop();
        token = tokenizer.pop();
        if (token === null) {
          throw new ParserError("expected a day of the week", this.lineNumber);
        }
        this.daysOfWeek.push(token);
        token = tokenizer.top();
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
        throw new ParserError("expected an end time", this.lineNumber);
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
      tokenizer.pop(); // KEYWORD: AT
      token = tokenizer.pop();
      if (token === null) {
        throw new ParserError("expected a location", this.lineNumber);
      }
      this.location = token;
    }

    // stub for guests
    token = tokenizer.top();
    if (token === TokenKeywords.WITH) {
      let isFirst = true;
      while (isFirst || tokenizer.top() === TokenKeywords.AND) {
        if (isFirst) isFirst = false;
        tokenizer.pop(); // KEYWORD: WITH or AND
        token = tokenizer.pop();
        if (token === null) {
          throw new ParserError("expected a guest ID", this.lineNumber);
        }
        this.guests.push(token);
      }
    }
  }

  evaluate(map: any, events: object[]): void {
    let start: number[];
    let end: number[];
    let startMoment: any;

    // create the start date based on if it's recurring or not
    if (this.repeating) {
      startMoment = moment();
      start = startMoment.format("YYYY-M-D").split("-");
    } else {
      startMoment = moment(this.date, "MMMM D, YYYY");
      start = startMoment.format("YYYY-M-D").split("-");
    }

    // create the end date based on if it's all day or not
    if (this.allDay) {
      end = startMoment
        .add(1, "days")
        .format("YYYY-M-D")
        .split("-");
    } else {
      end = [...start];
      start.push(...this.fromTime.split(":").map(Number));
      end.push(...this.toTime.split(":").map(Number));
    }

    // create the event attribute object
    let newEvent: any = {
      title: this.title,
      start: start,
      end: end
    };

    // create the recurrence rule
    if (this.repeating) {
      let days: string = this.daysOfWeek.reduce(
        (acc: string, curr: string): string => {
          return acc + curr.substring(0, 2).toUpperCase() + ",";
        },
        ""
      );
      newEvent["recurrenceRule"] = "FREQ=WEEKLY;BYDAY=" + days + ";INTERVAL=1";
    }

    if (this.guests.length) {
      let attendees: object[] = [];
      this.guests.forEach(guest => {
        let attendee = {
          name: map[guest][1],
          email: map[guest][2],
          role: "REQ-PARTICIPANT"
        }
        attendees.push(attendee);
      });
      newEvent["attendees"] = attendees;
    }

    if (this.location) {
      newEvent["location"] = map[this.location][1];
    }

    events.push(newEvent);
  }

  nameCheck(map: any): void {
    // namecheck guest
    this.guests.forEach(guest => {
      if (!map.hasOwnProperty(guest)) {
        throw new NameCheckError(
          `Guest with identifier ${guest} is not defined.`,
          this.lineNumber
        );
      }
    });

    // namecheck location
    if (this.location !== "" && !map.hasOwnProperty(this.location)) {
      throw new NameCheckError(
        `Event location with identifier ${this.location} is not defined.`,
        this.lineNumber
      );
    }
  }

  typeCheck(map: any): void {
    // typecheck date
    if (!this.repeating && !moment(this.date, "MMMM D, YYYY").isValid()) {
      throw new TypeCheckError(
        {
          expected: "a valid date",
          actual: this.date
        },
        this.lineNumber
      );
    }

    // typecheck fromTime
    if (!moment(this.fromTime, "hh:mm").isValid()) {
      throw new TypeCheckError(
        {
          expected: "a valid start time",
          actual: this.fromTime
        },
        this.lineNumber
      );
    }

    // typecheck toTime
    if (!moment(this.toTime, "hh:mm").isValid()) {
      throw new TypeCheckError(
        {
          expected: "a valid end time",
          actual: this.toTime
        },
        this.lineNumber
      );
    }

    // typecheck days of the week
    this.daysOfWeek.forEach(dayOfWeek => {
      if (!Event.validDays.includes(dayOfWeek)) {
        throw new TypeCheckError(
          {
            expected: "a valid day of the week",
            actual: dayOfWeek
          },
          this.lineNumber
        );
      }
    });

    // typecheck guests
    if (this.guests.length) {
      this.guests.forEach(guest => {
        const guestMapValue = map[guest];

        if (!(guestMapValue[0] === "Guest")) {
          throw new TypeCheckError(
            {
              expected: `${guest} to be a valid Guest`,
              actual: guestMapValue[0]
            },
            this.lineNumber
          );
        }
      });
    }

    // typecheck location
    if (this.location) {
      const locationMapValue = map[this.location];

      if (!(locationMapValue[0] === "Location")) {
        throw new TypeCheckError(
          {
            expected: `${this.location} to be a valid Location`,
            actual: locationMapValue[0]
          },
          this.lineNumber
        );
      }
    }
  }
}
