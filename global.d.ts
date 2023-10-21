declare module "@woowacourse/mission-utils" {
  class Random {
    static pickNumberInRange(
      startInclusive: number,
      endInclusive: number
    ): number;
  }
  class Console {
    static readLineAsync(query: string): Promise<string>;
    static print(message?: any): void;
  }
}
