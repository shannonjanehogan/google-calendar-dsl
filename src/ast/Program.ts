import Node from "../Node";
import CalTypes from "./CalTypes";
import Events from "./Events";
import

export default class Program extends Node {
  let calTypes = new Array<CalTypes>;

  public parse(): void {
   tokenizer.getAndCheckNext("Start");
   while (!tokenizer.checkToken("End")) {
     let calType: CalType = null;
     if (tokenizer.checkToken("Events:")) {
       calType = new Events();
     }
   }
   calType.parse();
   calTypes.add(calType);
   Calendar.createCalendarFile();
  }

  public nameCheck(): void {
    for (let calType of calTypes) {
      calType.nameCheck();
    }
  }
}
