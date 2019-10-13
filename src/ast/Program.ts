import Node from "../Node";
import Events from "./Events";
import Guests from "./Guests";
import Locations from "./Locations";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";
import { TokenKeywords } from "../TokenKeywords";

export default class Program extends Node {
  nodes: Node[] = [];
  map: { [k: string]: any; } = {};

  parse(tokenizer: Tokenizer): void {
    // we might be able to get rid of the [Start] and [End] tokens by just relying on the tokenizer.hasNext() method?
    let currentLine = tokenizer.getLine();
    let token = tokenizer.pop();
    if (token !== TokenKeywords.START) {
      throw new ParserError(`expected keyword [${TokenKeywords.START}] but got [${token}]`, currentLine);
    }
    while (tokenizer.top() !== TokenKeywords.END) {
      currentLine = tokenizer.getLine();
      token = tokenizer.top();
      switch (token) {
        case TokenKeywords.GUESTS:
          let guests = new Guests(); 
          guests.parse(tokenizer);
          this.nodes.push(guests); 
          break; 
        case TokenKeywords.LOCATIONS:
          let locations = new Locations(); 
          locations.parse(tokenizer);
          this.nodes.push(locations); 
          break; 
        case TokenKeywords.EVENTS:
          let events = new Events();
          events.parse(tokenizer);
          this.nodes.push(events);
          break;
        default:
          throw new ParserError(`Error at line ${currentLine}: unrecognized token [${token}]`);
      }
    }
    currentLine = tokenizer.getLine();
    token = tokenizer.pop();
    if (token !== TokenKeywords.END) {
      throw new ParserError(`expected keyword [${TokenKeywords.START}] but got [${token}]`, currentLine);
    }
  }

evaluate(context: object[]): void {
    for (let node of this.nodes) {
      node.evaluate(context);
    }
  }

  nameCheck(): void {
    for (let node of this.nodes) {
      node.nameCheck(this.map);
    }
    console.log("Map after nameCheck: ", this.map, "\n\n");
  }

  typeCheck(): void {
    for (let node of this.nodes) {
      node.typeCheck(this.map);
    }
    console.log("Map after typeCheck: ", this.map, "\n\n");
  }
}
