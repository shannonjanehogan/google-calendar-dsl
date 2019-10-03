import Tokenizer from "./Tokenizer";

export default abstract class Node {
  let names = new Array<String>;
  let types = new Map<String, String>;
  let tokenizer = Tokenizer.getTokenizer();
  abstract parse();
  abstract evaluate();
  abstract nameCheck();
}
