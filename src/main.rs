use std::process;

use clap::Parser;
use defs::Solution;
use solutions::day_1::Day1Solution;

mod defs;
mod solutions;

pub const YEAR: &'static str = "2023";

#[derive(Parser)]
struct Args {
    #[clap(short, long)]
    download_input_day: Option<u8>,

    #[clap(env = "ADVENT_SESSION_KEY")]
    advent_session_key: Option<String>,
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    let args = Args::parse();

    if let Some(day) = args.download_input_day {
        let session_key = args
            .advent_session_key
            .expect("ADVENT_SESSION_KEY not set for downloading input");
        let url = format!("https://adventofcode.com/{}/day/{}/input", YEAR, day);
        let client = reqwest::Client::new();
        let result = client
            .get(url)
            .header("Cookie", format!("session={}", session_key))
            .send()
            .await
            .unwrap();
        let text = sanitize_downloaded_input(result.text().await.unwrap());
        std::fs::write(format!("./src/inputs/{}-input.txt", day), text).unwrap();
        println!("Downloaded input for day {}", day);
        process::exit(0);
    }

    let solution = Day1Solution::new("./src/inputs/1-input.txt");

    println!("Part 1: {}", solution.get_part_1_solution());
    println!("Part 2: {}", solution.get_part_2_solution());
}

pub fn sanitize_downloaded_input(input: String) -> String {
    input.trim().to_string()
}
