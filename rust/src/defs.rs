use std::fmt::Debug;

pub trait AdventProblemSolver<PartOneSolution: Debug, PartTwoSolution: Debug> {
  fn part_one_solution(&self) -> PartOneSolution;
  fn part_two_solution(&self) -> PartTwoSolution;
  fn log_both_solutions(&self) {
    println!("Part 1: {:?}", self.part_one_solution());
    println!("Part 2: {:?}", self.part_two_solution());
  }
}
