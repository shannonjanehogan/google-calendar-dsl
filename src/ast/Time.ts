// hhmm 24 time eg. 1100 or 2315
class Time extends Event {
  time: String;

  parse(): void {
    dayName = tokenizer.getNext();
    // TODO use moment to double check it follows military time? or string/split to validate
  }

  // evaluate should call superclass Event.evaluate


  // TODO figure out what to do with typeCheck() and nameCheck() methods
}
