import Program from "./ast/Program";
import Tokenizer from "./Tokenizer";
import Calendar from "./Calendar";

let tokenizer = new Tokenizer("./inputs/valid_simple.cal");
let program = new Program();

program.parse(tokenizer);
program.nameCheck();
program.typeCheck();
let calendar = new Calendar();
let context: object[] = [];
program.evaluate(context);
calendar.createCalendarFile(context)
