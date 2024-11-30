use std::fs;

pub trait Solution<T1, T2> {
    fn new(input_path: &str) -> Self;
    fn get_part_1_solution(&self) -> T1;
    fn get_part_2_solution(&self) -> T2;

    fn load_input(input_path: &str) -> String {
        fs::read_to_string(input_path).unwrap()
    }
}
