use std::fs;

use crate::defs::AdventProblemSolver;

pub struct Day1Solution {
  input: String,
}

impl Day1Solution {
  pub fn new(file_path: &str) -> Self {
    let input = fs::read_to_string(file_path).expect("Could not read input file");
    Self { input: input }
  }
}

impl AdventProblemSolver<u32, u32> for Day1Solution {
  fn part_one_solution(&self) -> u32 {
    self
      .input
      .lines()
      .map(|line| {
        let vec = line.chars().filter(|c| c.is_digit(10)).collect::<Vec<_>>();
        let first = vec[0].to_digit(10).unwrap() * 10;
        let last = vec[vec.len() - 1].to_digit(10).unwrap();
        first + last
      })
      .sum()
  }
  fn part_two_solution(&self) -> u32 {
    todo!("Part 2")
  }
}
