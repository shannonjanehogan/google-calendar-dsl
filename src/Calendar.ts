const { writeFileSync } = require('fs')
const ics = require('ics')

export default class Calendar {
  let events = new Array<>;

  createCalendarFile(): void {
    ics.createEvents(events, (error, value) => {
      if (error) {
        // TODO throw appropriate error
        console.log(error)
      }

      writeFileSync('outputs/event.ics', value)
    })
  }
}
