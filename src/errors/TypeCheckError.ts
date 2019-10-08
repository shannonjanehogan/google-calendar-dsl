export class TypeCheckError extends Error {
  constructor(error: { expected: string; actual: string }, lineNumber: number) {
    super(
      `Error on line ${lineNumber}: expected ${error.expected} but got ${error.actual}`
    );
  }
}
