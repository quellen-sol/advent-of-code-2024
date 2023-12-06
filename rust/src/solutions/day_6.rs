use std::fs;

use crate::{defs::AdventProblemSolver, utils::utils::get_all_captures};

#[derive(Debug)]
pub struct Race {
  time: u64,
  distance: u64,
}

impl Race {
  pub fn simulate_race(&self, held_time: u64) -> bool {
    let move_time = self.time - held_time;
    let speed = held_time;
    let distance = speed * move_time;
    return distance > self.distance;
  }

  pub fn find_ways_to_win(&self) -> u64 {
    let mut ways_to_win = 0;

    for i in 0..self.time + 1 {
      if (self.simulate_race(i)) {
        ways_to_win += 1;
      }
    }

    ways_to_win
  }
}

pub struct Day6Solution {
  input: String,
}

impl Day6Solution {
  pub fn new(file_path: &str) -> Self {
    let input = fs::read_to_string(file_path).expect("Could not read input file");
    Self { input: input }
  }
}

impl AdventProblemSolver<u64, u64> for Day6Solution {
  fn part_one_solution(&self) -> u64 {
    let lines: Vec<&str> = self.input.lines().collect();
    let times: Vec<u64> = get_all_captures(r"(\d+)", lines[0])
      .unwrap()
      .iter()
      .map(|c| c.parse().unwrap())
      .collect();
    let distances: Vec<u64> = get_all_captures(r"(\d+)", lines[1])
      .unwrap()
      .iter()
      .map(|c| c.parse().unwrap())
      .collect();
    let races: Vec<Race> = times
      .iter()
      .zip(distances.iter())
      .map(|(time, dist)| Race {
        time: *time,
        distance: *dist,
      })
      .collect();
    println!("{:?}", races);
    let result: u64 = races.iter().fold(1, |acc, e| acc * e.find_ways_to_win());
    result
  }

  fn part_two_solution(&self) -> u64 {
    let lines: Vec<&str> = self.input.lines().collect();
    let total_time = get_all_captures(r"(\d+)", lines[0])
      .unwrap()
      .join("")
      .parse()
      .unwrap();
    let total_distance = get_all_captures(r"(\d+)", lines[1])
      .unwrap()
      .join("")
      .parse()
      .unwrap();

    let race = Race {
      time: total_time,
      distance: total_distance,
    };

    race.find_ways_to_win()
  }
}
