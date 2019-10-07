import Node from "../Node";
import CalTypes from "./CalTypes";
import Events from "./Events";
import Tokenizer from "../Tokenizer";

export default class Program extends Node {
  calTypes: CalTypes[] = [];

  parse(tokenizer: Tokenizer): void {
   tokenizer.getAndCheckNext("Start");
   while (!tokenizer.checkToken("End")) {
     let calType: CalTypes = null;
     if (tokenizer.checkToken("Events:")) {
       calType = new Events();
     }
     calType.parse();
     this.calTypes.push(calType);
   }
  }

  evaluate(): void {
    for (let calType of this.calTypes) {
      calType.evaluate();
    }
  }

  nameCheck(): void {
    for (let calType of this.calTypes) {
      calType.nameCheck();
    }
  }

  typeCheck(): void {
    for (let calType of this.calTypes) {
      calType.typeCheck();
    }
  }
}
