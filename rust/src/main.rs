#![allow(dead_code)]
use defs::AdventProblemSolver;
use solutions::day_1::Day1Solution;

mod defs;
mod example_solution;
mod solutions;

fn main() {
  let day_1 = Day1Solution::new("./src/solutions/day-1-input.txt");
  println!("Part 1 Solution: {}", day_1.part_one_solution());
  println!("Part 2 Solution: {}", day_1.part_two_solution());
}
