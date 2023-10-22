//@ts-check
/** @typedef {{strikeCount: number, ballCount: number}} BaseBallResult */

import { Console } from "@woowacourse/mission-utils";
import MESSAGES from "./Messages.js";

class Utils {
  static threeLengthNumber = /^[1-9]{3}$/;
  static noDuplicate = /^(?!.*(.).*\1).*$/;
  /** @param {string} input */
  static validateInput(input) {
    if (!this.threeLengthNumber.test(input)) throw new Error("[ERROR]");
    if (!this.noDuplicate.test(input)) throw new Error("[ERROR]");
  }
  /** @param {string} str */
  static getNumberArrayFromString(str) {
    let i;
    const len = str.length;
    /** @type {number[]} */
    const arr = [];
    for (i = 0; i < len; i++) {
      arr.push(Number(str[i]));
    }
    return arr;
  }
  /**
   * return numbers of strikes and balls
   * @param {number[]} computersNumber
   * @param {number[]} playersNumber
   * @returns {BaseBallResult}
   */
  static getScores(computersNumber, playersNumber) {
    const initValue = {
      strikeCount: 0,
      ballCount: 0,
    };
    return computersNumber.reduce(
      /** @param {BaseBallResult} result */ (result, val, idx) => {
        const isStrike = val === playersNumber[idx];
        if (isStrike) {
          return { ...result, strikeCount: result.strikeCount + 1 };
        }
        const isBall = !isStrike && playersNumber.some((num) => num === val);
        if (isBall) {
          return { ...result, ballCount: result.ballCount + 1 };
        }
        return result;
      },
      initValue
    );
  }
  /**
   * @param {number} strikeCount
   * @param {number} ballCount
   * @returns 'true' represent 3 strikes
   */
  static showResultByScore(strikeCount, ballCount) {
    if (typeof strikeCount !== "number" || typeof ballCount !== "number") {
      throw new Error("[ERROR]");
    }
    if (!strikeCount && !ballCount) {
      Console.print(MESSAGES.nothing);
      return false;
    }
    if (strikeCount === 3) {
      Console.print(`3${MESSAGES.strike}`);
      return true;
    }
    /** @type {string[]} */
    const str = [];
    ballCount && str.push(`${ballCount}${MESSAGES.ball}`);
    strikeCount && str.push(`${strikeCount}${MESSAGES.strike}`);
    Console.print(str.join(" "));
    return false;
  }
}

export default Utils;
