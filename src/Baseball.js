//@ts-check
import { Console, Random } from "@woowacourse/mission-utils";
import MESSAGES from "./Messages.js";
import Utils from "./Utils.js";

class BaseBall {
  /** @type {number[]} */
  computerNumbers = [];
  /** @type {number[]} */
  playerNumbers = [];
  isQuit = false;
  isAnswer = false;
  async start() {
    Console.print(MESSAGES.start);
    await this.playGame();
  }
  setComputersNumber() {
    /** @type {number[]} */
    const tempNumbers = [];
    /** @type {number} */
    let tempNumber;
    while (tempNumbers.length < 3) {
      tempNumber = Random.pickNumberInRange(1, 9);
      !tempNumbers.includes(tempNumber) && tempNumbers.push(tempNumber);
    }
    this.computerNumbers = tempNumbers;
  }
  async setPlayerNumber() {
    const input = await Console.readLineAsync(MESSAGES.askInput);
    Utils.validateInput(input);
    this.playerNumbers = Utils.getNumberArrayFromString(input);
  }
  test() {
    const { strikeCount, ballCount } = Utils.getScores(
      this.computerNumbers,
      this.playerNumbers
    );
    return Utils.showResultByScore(strikeCount, ballCount);
  }
  async playGame() {
    while (!this.isQuit) {
      this.isAnswer = false;
      this.setComputersNumber();
      while (!this.isAnswer) {
        await this.setPlayerNumber();
        this.isAnswer = this.test();
      }
      this.isQuit = await this.quitOrReplay();
    }
  }

  /** @returns true represents quit and false replay */
  async quitOrReplay() {
    Console.print(MESSAGES.quit);
    const input = await Console.readLineAsync(MESSAGES.askRestartOrQuit);
    switch (input) {
      case "1":
        return false;
      case "2":
        return true;
      default:
        throw new Error("[ERROR]");
    }
  }
}

export default BaseBall;
