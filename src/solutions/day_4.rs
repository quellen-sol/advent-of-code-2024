use crate::{
    defs::Solution,
    utils::grid::{Grid, GridCreationItem, GridDirection},
};

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
        let grid = self.build_grid();

        let scan = grid.scan();
        let mut num_xmases = 0;

        for node in scan {
            let val = &node.value;
            if *val != 'X' {
                continue;
            }

            let neighbors = node.neighbors(&grid);

            for neigh in neighbors {
                let v = &neigh.value;
                if *v == 'M' {
                    // Start of an "XMAS"?
                    let Some(direction) = node.try_get_direction(neigh) else {
                        continue;
                    };

                    let mut dir_iter = neigh.direction_iter(&grid, direction);

                    if dir_iter.next().is_some_and(|v| v.value == 'A')
                        && dir_iter.next().is_some_and(|v| v.value == 'S')
                    {
                        num_xmases += 1;
                    }
                }
            }
        }

        num_xmases
    }

    fn get_part_2_solution(&self) -> i32 {
        let mut valid_xs = 0;
        let grid = self.build_grid();
        let scan = grid.scan();

        for node in scan {
            if node.value == 'A' {
                let nw = node.get_node_in_direction(&grid, GridDirection::NorthWest);
                let ne = node.get_node_in_direction(&grid, GridDirection::NorthEast);
                let sw = node.get_node_in_direction(&grid, GridDirection::SouthWest);
                let se = node.get_node_in_direction(&grid, GridDirection::SouthEast);

                if nw.is_none() || ne.is_none() || sw.is_none() || se.is_none() {
                    // an X is not possible
                    continue;
                }

                let nw = nw.unwrap();
                let ne = ne.unwrap();
                let sw = sw.unwrap();
                let se = se.unwrap();

                let first_part_of_x_valid = (nw.value == 'M' || nw.value == 'S')
                    && (se.value == 'M' || se.value == 'S')
                    && (nw != se);

                let second_part_of_x_valid = (ne.value == 'M' || ne.value == 'S')
                    && (sw.value == 'M' || sw.value == 'S')
                    && (ne != sw);

                if first_part_of_x_valid && second_part_of_x_valid {
                    valid_xs += 1;
                }
            }
        }

        valid_xs
    }
}

impl Day4Solution {
    fn build_grid(&self) -> Grid<char> {
        let creation_iter = self.get_input().chars().map(|c| {
            if c == '\n' {
                GridCreationItem::Break
            } else {
                GridCreationItem::Item(c)
            }
        });

        Grid::from_iter(creation_iter)
    }
}