pub trait AdventProblemSolver<PartOneSolution, PartTwoSolution> {
  fn part_one_solution(&self) -> PartOneSolution;
  fn part_two_solution(&self) -> PartTwoSolution;
}
