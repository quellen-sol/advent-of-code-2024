#[macro_export]
macro_rules! make_and_run_solution {
    ($day:expr) => {
        ::paste::paste! {
            let solution = [<Day $day Solution>]::new(&format!("./src/inputs/{}-input.txt", $day));
            solution.run_both_solutions();
        }
    };
}
