use crate::defs::Solution;

pub struct Day4Solution {
    input: String,
}

impl Solution<i32, i32> for Day4Solution {
    fn new(input_path: &str) -> Self {
        let input = Self::load_input(input_path);
        Self { input }
    }

    fn get_input(&self) -> &str {
        &self.input
    }

    fn get_part_1_solution(&self) -> i32 {
        todo!()
    }

    fn get_part_2_solution(&self) -> i32 {
        todo!()
    }
}
