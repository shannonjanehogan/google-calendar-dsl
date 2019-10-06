import DayOfWeek from "./DayOfWeek";
import Date from "./Date";

class Event extends CalTypes {
  event: String;
  calTypes: Array<CalTypes>;

  parse(): void {
    while (!tokenizer.checkToken(";")) {
      eventName = tokenizer.getNext();
      if (tokenizer.checkToken("every") || tokenizer.checkToken("and")) {
        calTypes.add(new DayOfWeek());
      }
      if (tokenizer.checkToken("on")) {
        calTypes.add(new Date());
      }
      if (tokenizer.checkToken("from") || tokenizer.checkToken("to")) {
        calTypes.add(new Time());
      }
    }
    for (calType in CalTypes) {
      calType.parse();
    }
  }

  // TODO figure out what to do with typeCheck() and nameCheck() methods
}
