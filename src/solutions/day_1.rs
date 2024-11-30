use crate::defs::Solution;

pub struct Day1Solution {
    input: String,
}

impl Solution<u32, u32> for Day1Solution {
    fn new(input_path: &str) -> Self {
        let input = Self::load_input(input_path);
        Self { input }
    }

    fn get_part_1_solution(&self) -> u32 {
        1
    }

    fn get_part_2_solution(&self) -> u32 {
        4
    }
}
