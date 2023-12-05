#![allow(dead_code, unused)]
use defs::AdventProblemSolver;
use solutions::day_1::Day1Solution;

mod defs;
mod example_solution;
mod solutions;
mod utils;

fn main() {
  let solution = Day1Solution::new("./src/solutions/day-1-input.txt");
  solution.log_both_solutions();
}
