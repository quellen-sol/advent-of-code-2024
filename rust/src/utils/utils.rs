use anyhow::{anyhow, Result};
use regex::Regex;

pub fn get_all_captures<'a>(re: &str, string: &'a str) -> Result<Vec<&'a str>> {
  Ok(
    Regex::new(re)?
      .captures_iter(string)
      .map(|c| {
        let (_, [val]) = c.extract::<1>();
        val
      })
      .collect::<Vec<_>>(),
  )
}
