console.log("Hello world");

import Program from "./ast/Program";
import Tokenizer from "./Tokenizer";

let tokenizer = new Tokenizer();
Tokenizer.makeTokenizer("./inputs/valid_simple.cal");
let program = new Program();
program.parse();
program.nameCheck();
program.typeCheck();
program.evaluate();
