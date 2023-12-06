use std::fs;

use crate::defs::AdventProblemSolver;

struct ExampleSolution {
  input: String,
}

impl ExampleSolution {
  pub fn new(file_path: &str) -> Self {
    let text = fs::read_to_string(file_path).expect("Could not read input file");
    Self { input: text }
  }
}

impl AdventProblemSolver<u32, u32> for ExampleSolution {
  fn part_one_solution(&self) -> u32 {
    todo!("Part 1")
  }
  fn part_two_solution(&self) -> u32 {
    todo!("Part 2")
  }
}
