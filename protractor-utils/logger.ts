import { browser } from "protractor";

export class Logger {
  public static boldedLog(text: string, char: string = "-") {
    let beforeAndAfterBrackets = "";

    for (let i = 0; i < text.length + 5; i++) {
      beforeAndAfterBrackets += char;
    }
    this.logToConsole(beforeAndAfterBrackets);
    this.logToConsole(" " + text);
    this.logToConsole(beforeAndAfterBrackets);
  }

  public static logToConsole(text: string) {
    browser.logger.info(text);
  }

  public static async logTestCaseName(testCaseName: string) {
    await this.boldedLog("TEST CASE: " + testCaseName, "=");
  }
}
