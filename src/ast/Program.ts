import Node from "../Node";
import Events from "./Events";
import Tokenizer from "../Tokenizer";
import { ParserError } from "../errors/ParserError";

export default class Program extends Node {
  nodes: Node[] = [];

  parse(tokenizer: Tokenizer): void {
    // we might be able to get rid of the [Start] and [End] tokens by just relying on the tokenizer.hasNext() method?
    let currentLine = tokenizer.getLine();
    let token = tokenizer.pop();
    if (token !== "Start") {
      throw new ParserError(`Error at line ${currentLine}: expected keyword [Start] but got [${token}]`);
    }
    while (tokenizer.top() !== "End") {
      currentLine = tokenizer.getLine();
      token = tokenizer.top();
      switch (token) {
        case "Events:":
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
    if (token !== "End") {
      throw new ParserError(`Error at line ${currentLine}: expected keyword [End] but got [${token}]`);
    }
  }

  evaluate(): void {
    for (let node of this.nodes) {
      node.evaluate();
    }
  }

  nameCheck(): void {
    for (let node of this.nodes) {
      node.nameCheck();
    }
  }

  typeCheck(): void {
    for (let node of this.nodes) {
      node.typeCheck();
    }
  }
}
