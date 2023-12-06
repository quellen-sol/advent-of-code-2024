#![allow(dead_code, unused)]
use defs::AdventProblemSolver;
use solutions::{day_1::Day1Solution, day_6::Day6Solution};

mod defs;
mod example_solution;
mod solutions;
mod utils;

fn main() {
  let solution = Day6Solution::new("./src/solutions/day-6-input.txt");
  solution.log_both_solutions();
}
