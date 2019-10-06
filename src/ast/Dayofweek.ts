class DayOfWeek extends Event {
  dayOfWeek: String;

  parse(): void {
    dayName = tokenizer.getAndCheckNext("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday");
  }

  // evaluate should call superclass Event.evaluate


  // TODO figure out what to do with typeCheck() and nameCheck() methods
}
