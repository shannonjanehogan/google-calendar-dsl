import Program from "./ast/Program";
import Tokenizer from "./Tokenizer";

let tokenizer = new Tokenizer("./inputs/valid_simple.cal");
let program = new Program();

program.parse(tokenizer);
// program.nameCheck();
program.typeCheck();
// program.evaluate();
