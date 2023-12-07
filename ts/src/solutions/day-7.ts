import { Solution } from "../definitions";
import { ArrayCountsWithElements, arrayCount, arrayCountByCallback, arrayCountByWithElements } from "../utils/utils";

type Hand = {
  // Always length 5
  cards: string[];
  bid: number;
};

type ParsedHand = {
  handType: HandType;
  hand: Hand;
  values: string[];
}

enum HandType {
  FiveOfKind = 6,
  FourOfKind = 5,
  FullHouse = 4,
  ThreeOfKind = 3,
  TwoPair = 2,
  OnePair = 1,
  HighCard = 0
}

const cardValsP1 = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  "T": 8,
  "J": 9,
  "Q": 10,
  "K": 11,
  "A": 12
};

const cardValsP2 = {
  "J": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  "T": 9,
  "Q": 10,
  "K": 11,
  "A": 12
};

export class Day7Solution extends Solution {
  constructor() {
    super("./src/solutions/day-7-input.txt");
  }
  part1Solution() {
    const hands: ParsedHand[] = this.lines.map(line => {
      const hand = this.parseLineToHand(line);
      const { handType, values } = this.getHandTypePart1(hand);
      return {
        handType,
        hand,
        values,
      };
    });

    const sortedHands = hands.sort((a, b) => this.compareHandsForSort(a, b));
    const totalWinnings = sortedHands.reduce((acc, curr, idx) => {
      const factor = idx + 1;
      return acc + (curr.hand.bid * factor);
    }, 0);
    return totalWinnings;
  }
  part2Solution() {
    const hands: ParsedHand[] = this.lines.map(line => {
      const hand = this.parseLineToHand(line);
      const { handType, values } = this.getHandTypePart2(hand);
      return {
        handType,
        hand,
        values,
      };
    });

    const sortedHands = hands.sort((a, b) => this.compareHandsForSort(a, b, cardValsP2));
    const totalWinnings = sortedHands.reduce((acc, curr, idx) => {
      const factor = idx + 1;
      return acc + (curr.hand.bid * factor);
    }, 0);
    return totalWinnings;
  }

  parseLineToHand(line: string): Hand {
    const [cards, bid] = line.trim().split(" ");
    return {
      cards: cards.split(""),
      bid: parseInt(bid)
    }
  }

  compareHandsForSort(handA: ParsedHand, handB: ParsedHand, map = cardValsP1): -1 | 0 | 1 {
    if (handA.handType > handB.handType) {
      return 1;
    } else if (handA.handType < handB.handType) {
      return -1;
    } else {
      // Start comparing by hand values
      for (let i = 0; i < 5; i++) {
        const handCharA = cardValsP1![handA.hand.cards[i] as keyof typeof cardValsP1];
        const handCharB = cardValsP1![handB.hand.cards[i] as keyof typeof cardValsP1];
        if (handCharA > handCharB) {
          return 1;
        } else if (handCharA < handCharB) {
          return -1;
        }
      }
      return 0;
    }
  }

  getHandTypePart2(hand: Hand): {
    handType: HandType,
    values: string[],
  } {
    if (hand.cards.every((c, _, a) => c === a[0] || c === "J")) {
      return {
        handType: HandType.FiveOfKind,
        values: [hand.cards[0]],
      };
    } else if (hand.cards.some((c, _, a) => {
      return arrayCountByCallback(a, (item) => item === c || item === "J"
      ) === 4;
    })) {
      const fourOfKind = hand.cards.find((c, _, a) => arrayCountByCallback(a, (item) => item === c || item === "J") === 4);
      return {
        handType: HandType.FourOfKind,
        values: [fourOfKind!],
      };
    } else if (hand.cards.some((c, _, a) => {
      return arrayCountByCallback(a, (item) => item === c || item === "J") >= 2;
    })) {
      // Try to find a Full House first
      // Look for 3, will be a three of kind too if the full house isn't found
      const threeExists = hand.cards.some((c, _, a) => arrayCountByCallback(a, (item) => item === c || item === "J") === 3);
      if (threeExists) {
        let counts: ArrayCountsWithElements<string>;
        for (const e of hand.cards) {
          const result = arrayCountByWithElements(hand.cards, (item) => item === e || item === "J");
          if (result.count === 3) {
            counts = result;
            break;
          }
        }
        const remaining = hand.cards.filter((_, i) => {
          return !counts.elements.some((e) => e.idx === i);
        });
        if (remaining[0] === remaining[1]) {
          return {
            handType: HandType.FullHouse,
            values: [],
          }
        } else {
          return {
            handType: HandType.ThreeOfKind,
            values: [],
          }
        }
      }
      // Then try to find a Two Pair
      let counts: ArrayCountsWithElements<string>;
      for (const c of hand.cards) {
        const result = arrayCountByWithElements(hand.cards, (item) => item === c || item === "J")
        if (result.count === 2) {
          counts = result;
          break;
        }
      }
      const remaining = hand.cards.filter((_, i) => {
        return !counts.elements.some((e) => e.idx === i);
      });
      const hasAnotherPair = remaining.some((c, _, a) => {
        return arrayCountByCallback(a, (item) => item === c) === 2;
      });
      if (hasAnotherPair) {
        return {
          handType: HandType.TwoPair,
          values: [],
        }
      }
      // Return One Pair if neither of those are found
      return {
        handType: HandType.OnePair,
        values: [],
      }
    } else {
      return {
        handType: HandType.HighCard,
        values: hand.cards,
      };
    }
  }

  getHandTypePart1(hand: Hand): {
    handType: HandType,
    values: string[],
  } {
    if (hand.cards.every((c, _, a) => c === a[0])) {
      return {
        handType: HandType.FiveOfKind,
        values: [hand.cards[0]],
      };
    } else if (hand.cards.some((c, _, a) => {
      return arrayCount(a, c) === 4;
    })) {
      const fourOfKind = hand.cards.find((c, _, a) => arrayCount(a, c) === 4);
      return {
        handType: HandType.FourOfKind,
        values: [fourOfKind!],
      };
    } else if (hand.cards.some((c, _, a) => {
      return arrayCount(a, c) === 3;
    }) && hand.cards.some((c, _, a) => {
      return arrayCount(a, c) === 2;
    })) {
      const threeOfKind = hand.cards.find((c, _, a) => arrayCount(a, c) === 3);
      const pair = hand.cards.find((c, _, a) => arrayCount(a, c) === 2);
      return {
        handType: HandType.FullHouse,
        values: [threeOfKind!, pair!],
      };
    } else if (hand.cards.some((c, _, a) => {
      return arrayCount(a, c) === 3;
    })) {
      const threeOfKind = hand.cards.find((c, _, a) => arrayCount(a, c) === 3);
      return {
        handType: HandType.ThreeOfKind,
        values: [threeOfKind!],
      };
    } else if (hand.cards.some((c, _, a) => {
      return arrayCount(a, c) === 2;
    })) {
      const pair = hand.cards.find((c, _, a) => arrayCount(a, c) === 2)!;
      const remainingCards = hand.cards.filter(c => c !== pair);
      if (remainingCards.some((c, _, a) => {
        return arrayCount(a, c) === 2;
      })) {
        const otherPair = remainingCards.find((c, _, a) => arrayCount(a, c) === 2)!;
        return {
          handType: HandType.TwoPair,
          values: [pair, otherPair],
        };
      }
      return {
        handType: HandType.OnePair,
        values: [pair],
      };
    } else {
      return {
        handType: HandType.HighCard,
        values: hand.cards,
      };
    }
  }
}