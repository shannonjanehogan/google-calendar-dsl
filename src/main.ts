import Program from "./ast/Program";
import Tokenizer from "./Tokenizer";
import Calendar from "./Calendar";

const args = process.argv;
const fileArg = args[2] || "./inputs/valid_simple.cal";

let tokenizer = new Tokenizer(fileArg);
let program = new Program();

program.parse(tokenizer);
program.nameCheck();
program.typeCheck();
let calendar = new Calendar();
let events: any[] = program.evaluate();
calendar.createCalendarFile(events);
