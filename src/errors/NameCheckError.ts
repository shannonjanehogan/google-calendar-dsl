export class NameCheckError extends Error {
  constructor(message: string, lineNumber?: number) {
    if (lineNumber) {
      super(`Error on line ${lineNumber}: ${message}`);
    } else {
      super(message);
    }
  }
}
