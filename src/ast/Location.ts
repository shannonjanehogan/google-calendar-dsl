import Node from "../Node";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";
import { TokenKeywords } from "../TokenKeywords";
import { NameCheckError } from "../errors/NameCheckError";

export default class Location extends Node {
  id: string = "";
  address: string = "";

  parse(tokenizer: Tokenizer): void {
    this.lineNumber = tokenizer.getLine();
    let token = tokenizer.pop();
    if (token === null) {
      throw new ParserError("expected a location ID", this.lineNumber);
    }
    this.id = token;

    token = tokenizer.pop();
    if (token !== TokenKeywords.IS) {
      throw new ParserError(
        `expected keyword [${TokenKeywords.IS}] but got [${token}]`,
        this.lineNumber
      );
    }

    token = tokenizer.pop();
    if (token === null) {
      throw new ParserError("expected a location address", this.lineNumber);
    }
    this.address = token;
  }
  evaluate(map: any, events: object[]): void {
    map[this.id][1] = this.address;
  }

  nameCheck(map: object): void {
    if (!map.hasOwnProperty(this.id)) {
      let values = [null, null];
      Object.assign(map, { [this.id as string]: values });
    } else {
      throw new NameCheckError(
        `Location with identifier ${this.id} is already defined.`,
        this.lineNumber
      );
    }
  }

  typeCheck(map: any): void {
    if (!map.hasOwnProperty(this.id))
      throw new Error("Map doesn't contain Location.");
    map[this.id][0] = "Location";
    // let id = this.id;
    // Object.entries(map).forEach(function([key, value]) {
    //   if (key === id) {
    //     value[0] = Location;
    //   }
    // });
  }
}
