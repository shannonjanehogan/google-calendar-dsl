// on September 28, 2019
class Date extends Event {
  month: String;
  date: String;
  year: String;

  parse(): void {
    month = tokenizer.getAndCheckNext("January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December");
    date = tokenizer.getNext();
    year = tokenizer.getNext();
  }

  // evaluate should call superclass Event.evaluate


  // TODO figure out what to do with typeCheck() and nameCheck() methods
}
