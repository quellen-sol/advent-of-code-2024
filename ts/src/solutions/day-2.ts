import { Solution } from "../definitions";

type ParsedGame = {
  red: number;
  green: number;
  blue: number;
};

type ParsedGameMap = {
  [gameNumber: string]: ParsedGame[];
}

export class Day2Solution extends Solution {
  constructor() {
    super("./src/solutions/day-2-input.txt");
  }

  part1Solution() {
    const maxCubeNums = {
      red: 12,
      green: 13,
      blue: 14
    };
    // Turn the input into a ParsedGameMap
    const gameMap = this.lines.reduce<ParsedGameMap>((acc, curr, idx, arr) => {
      const gameNumber = idx + 1;
      const gameResults = curr.replace(/Game \d+:\s*/, "").split(";").map<ParsedGame>(g => {
        return g.split(",").reduce<ParsedGame>((acc, curr) => {
          const colorResult = curr.trim().split(" ") as [amount: string, color: string];
          const amount = parseInt(colorResult[0]);
          const color = colorResult[1] as keyof ParsedGame;
          acc[color] = amount;
          return acc;
        }, {
          red: 0,
          green: 0,
          blue: 0
        })
      });
    
      acc[gameNumber] = gameResults;
      return acc;
    }, {});

    return Object.entries(gameMap).reduce((acc, curr) => {
      const [gameIdStr, gameResults] = curr;
      const gameId = parseInt(gameIdStr);
      const validGame = gameResults.every((gameResult) => {
        return gameResult.red <= maxCubeNums.red && gameResult.green <= maxCubeNums.green && gameResult.blue <= maxCubeNums.blue;
      });
      if (validGame) {
        acc += gameId;
      }
      return acc;
    }, 0);
  }

  part2Solution() {
    // Turn the input into a ParsedGameMap
    const gameMap = this.lines.reduce<ParsedGameMap>((acc, curr, idx, arr) => {
      const gameNumber = idx + 1;
      const gameResults = curr.replace(/Game \d+:\s*/, "").split(";").map<ParsedGame>(g => {
        return g.split(",").reduce<ParsedGame>((acc, curr) => {
          const colorResult = curr.trim().split(" ") as [amount: string, color: string];
          const amount = parseInt(colorResult[0]);
          const color = colorResult[1] as keyof ParsedGame;
          acc[color] = amount;
          return acc;
        }, {
          red: 0,
          green: 0,
          blue: 0
        })
      });

      acc[gameNumber] = gameResults;
      return acc;
    }, {});

    const minimums = Object.values(gameMap).map((games) => this.getMinimumCubesByGames(games));
    const result = minimums.reduce((accumulator, current) => {
      return accumulator + this.calculatePower(current);
    }, 0);
    return result;
  }

  getMinimumCubesByGames(games: ParsedGame[]): ParsedGame {
    const minimumRed = Math.max(...games.map((game) => game.red));
    const minimumGreen = Math.max(...games.map((game) => game.green));
    const minimumBlue = Math.max(...games.map((game) => game.blue));
    return {
      red: minimumRed,
      green: minimumGreen,
      blue: minimumBlue
    };
  }

  calculatePower(minimum: ParsedGame): number {
    return minimum.red * minimum.green * minimum.blue;
  } 
}