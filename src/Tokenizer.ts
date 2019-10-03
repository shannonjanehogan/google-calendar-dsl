
class Tokenizer {
  program: String = "";
  literals: Array<String> = ["start", "Events:", "every", "and", "on", "all day", "from", "at", "with", "Done", "End"];
  tokens: Array<Sting> = new Array<String>;
  currentToken: int;
  tokenizer: Tokenizer;

  // TODO space happy tokens

  getNext(): String {
    let token: String = "";
    if (this.moreTokens()) {
      token = this.tokens[this.currentToken];
      this.currentToken++;
    } else {
      token = "NULLTOKEN";
    }
    return token;
  }

  checkToken(regex): boolean {
    s: String = checkNext();
    return (s.matches(regexp));
  }

  getAndCheckNext(regex String): String {
    let s: String = getNext();
    return (s.matches(regex));
  }

  moreTokens(): boolean {
    return currentToken < tokens.length();
  }

  makeTokenizer(): void {
    if (tokenizer === null) {
      tokenizer = new Tokenizer();
    }
  }

  getTokenizer(): Tokenizer {
    return tokenizer;
  }
}
