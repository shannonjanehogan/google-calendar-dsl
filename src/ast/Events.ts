class Events extends CalTypes {
  events: String;
  calTypes: Array<CalTypes>;
 // name: String; // TODO should be renamed/figure out what to do here

  parse(): void {
    while (!tokenizer.checkToken("Done")) {
      let calType: CalType = null;
      if (tokenizer.checkToken("Events:")) {
        calType = new Event();
      }
    }
    calType.parse();
    calTypes.add(calType);
    Calendar.createCalendarFile();
  }

  // TODO figure out what to do with typeCheck() and nameCheck() methods
}
