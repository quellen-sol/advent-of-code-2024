import { Solution } from "../definitions";

type Card = {
  cardNum: number;
  winning: number[];
  mine: number[];
};

export class Day4Solution extends Solution {
  constructor() {
    super("./src/solutions/day-4-input.txt");
  }
  part1Solution() {
    const cards: {
      [cardNum: string]: number[];
    } = {};
    const result = this.lines
      .map((l) => l.split("|"))
      .reduce((a, [card, mine]) => {
        const cardNum = parseInt(card.match(/Card\s*(\d+):\s*/)![1]);
        const cardNums = card
          .replace(/Card\s*\d+:\s*/, "")
          .match(/\d+/g)!
          .map((v) => parseInt(v));
        cards[cardNum] = cardNums;
        const myNums = mine.match(/\d+/g)!.map((v) => parseInt(v));
        let exp = -1;
        for (const myNum of myNums) {
          if (cardNums.includes(myNum)) {
            exp += 1;
          }
        }

        if (exp === -1) {
          return a;
        }

        a += 2 ** exp;
        return a;
      }, 0);
    return result;
  }
  part2Solution() {
    const cards: {
      [cardNum: string]: Card;
    } = {};
    this.lines
      .map((l) => l.split("|"))
      .forEach(([card, mine]) => {
        const cardNum = parseInt(card.match(/Card\s*(\d+):\s*/)![1]);
        const cardNums = card
          .replace(/Card\s*\d+:\s*/, "")
          .match(/\d+/g)!
          .map((v) => parseInt(v));
        const myNums = mine.match(/\d+/g)!.map((v) => parseInt(v));
        cards[cardNum] = {
          cardNum,
          mine: myNums,
          winning: cardNums,
        };
      });

    const cardIter: Card[] = Object.values(cards);
    for (const card of cardIter) {
      const { cardNum } = card;
      const amountWins = this.winsForCard(card);
      for (let i = cardNum + 1; i <= cardNum + amountWins; i++) {
        cardIter.push(cards[i]);
      }
    }

    return cardIter.length;
  }

  winsForCard(card: Card) {
    let winCount = 0;
    for (const num of card.mine) {
      if (card.winning.includes(num)) {
        winCount++;
      }
    }
    return winCount;
  }
}
