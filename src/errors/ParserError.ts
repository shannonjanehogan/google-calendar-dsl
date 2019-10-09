export class ParserError extends Error {
  constructor(message: string, lineNumber?: number) {
    if (lineNumber) {
      super(`Error on line ${lineNumber}: ${message}`);
    } else {
      super(message);
    }
  }
}
