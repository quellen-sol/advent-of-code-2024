use crate::defs::AdventProblemSolver;

struct ExampleSolution {
  input: &'static str,
}

impl AdventProblemSolver<&'static str, &'static str> for ExampleSolution {
  fn solve_part_one() -> &'static str {
    "lol"
  }
  fn solve_part_two() -> &'static str {
    "lol"
  }
}