import * as fs from "fs";
import * as ics from "ics";
import { EventAttributes } from "ics";

export default class Calendar {
  createCalendarFile(events: object[]): void {
    ics.createEvents(events as EventAttributes[], (error: any, value: string) => {
      if (error) {
        // TODO throw appropriate error
        console.log(error)
      }
      fs.writeFileSync('outputs/event.ics', value)
    })
  }
}
