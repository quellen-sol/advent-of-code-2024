pub enum GridCreationItem<T> {
    Item(T),
    Break,
}

#[derive(Debug)]
pub struct Grid<T> {
    pub inner_data: Vec<Vec<GridNode<T>>>,
}

impl<T> Grid<T> {
    pub fn new(inner_data: Vec<Vec<GridNode<T>>>) -> Self {
        Self { inner_data }
    }

    pub fn from_iter(iter: impl Iterator<Item = GridCreationItem<T>>) -> Self {
        let mut inner_data = Vec::new();
        let mut current_row = Vec::new();
        let mut x = 0;
        let mut y = 0;

        for item in iter {
            match item {
                GridCreationItem::Item(item) => {
                    current_row.push(GridNode { value: item, x, y });
                    x += 1;
                }
                GridCreationItem::Break => {
                    inner_data.push(current_row);
                    current_row = Vec::new();
                    x = 0;
                    y += 1;
                }
            }
        }

        if !current_row.is_empty() {
            inner_data.push(current_row);
        }

        Self { inner_data }
    }

    pub fn get_node(&self, x: isize, y: isize) -> Option<&GridNode<T>> {
        self.inner_data.get(y as usize)?.get(x as usize)
    }

    pub fn scan(&self) -> GridScanIterator<T> {
        GridScanIterator {
            grid: self,
            current_position: (0, 0),
        }
    }

    pub fn traverse_row(&self, y: isize) -> GridNodeDirectionIterator<T> {
        let node = self.get_node(0, y).unwrap();
        node.direction_iter(self, GridDirection::East)
    }

    pub fn traverse_column(&self, x: isize) -> GridNodeDirectionIterator<T> {
        let node = self.get_node(x, 0).unwrap();
        node.direction_iter(self, GridDirection::South)
    }

    pub fn iter_rows(&self) -> GridScanIterator<T> {
        self.scan()
    }

    pub fn iter_columns(&self) -> GridColumnIterator<T> {
        GridColumnIterator {
            grid: self,
            current_position: (0, 0),
        }
    }

    pub fn num_rows(&self) -> usize {
        self.inner_data.len()
    }

    pub fn num_columns(&self) -> usize {
        self.inner_data.first().unwrap().len()
    }
}

pub struct GridColumnIterator<'a, T> {
    grid: &'a Grid<T>,
    current_position: (isize, isize), // (x, y)
}

impl<'a, T> Iterator for GridColumnIterator<'a, T> {
    type Item = &'a GridNode<T>;

    fn next(&mut self) -> Option<Self::Item> {
        let (ref mut x, ref mut y) = self.current_position;
        let node = self.grid.get_node(*x, *y)?;
        *y += 1;
        Some(node)
    }
}

pub struct GridScanIterator<'a, T> {
    grid: &'a Grid<T>,
    current_position: (isize, isize), // (x, y)
}

impl<'a, T> Iterator for GridScanIterator<'a, T> {
    type Item = &'a GridNode<T>;

    fn next(&mut self) -> Option<Self::Item> {
        let (ref mut x, ref mut y) = self.current_position;
        let node = self.grid.get_node(*x, *y)?;
        *x += 1;
        if *x as usize >= self.grid.inner_data[*y as usize].len() {
            *x = 0;
            *y += 1;
        }
        Some(node)
    }
}

#[derive(Debug)]
pub struct GridNode<T> {
    pub value: T,
    pub x: isize,
    pub y: isize,
}

impl<T: Clone> Clone for GridNode<T> {
    fn clone(&self) -> Self {
        Self {
            value: self.value.clone(),
            x: self.x,
            y: self.y,
        }
    }
}

impl<T: PartialEq> PartialEq for GridNode<T> {
    fn eq(&self, other: &Self) -> bool {
        self.value == other.value
    }
}

impl<T> GridNode<T> {
    pub fn add_direction(&self, direction: GridDirection) -> (isize, isize) {
        let (dx, dy) = direction.get_offset();
        (self.x + dx, self.y + dy)
    }

    pub fn get_node_in_direction<'a>(
        &self,
        grid: &'a Grid<T>,
        direction: GridDirection,
    ) -> Option<&'a GridNode<T>> {
        let new_dir = self.add_direction(direction);
        grid.get_node(new_dir.0, new_dir.1)
    }

    pub fn neighbors<'a>(&'a self, grid: &'a Grid<T>) -> GridNodeNeighborsIterator<'a, T> {
        GridNodeNeighborsIterator {
            grid,
            node: self,
            idx: 0,
        }
    }

    pub fn direction_iter<'a>(
        &'a self,
        grid: &'a Grid<T>,
        direction: GridDirection,
    ) -> GridNodeDirectionIterator<'a, T> {
        GridNodeDirectionIterator {
            direction,
            grid,
            current_node: self,
        }
    }

    pub fn try_get_direction(&self, other: &Self) -> Option<GridDirection> {
        let diff_x = other.x.checked_sub(self.x)?;
        if diff_x.abs() > 1 {
            return None;
        }

        let diff_y = other.y.checked_sub(self.y)?;
        if diff_y.abs() > 1 {
            return None;
        }

        GridDirection::from_offset((diff_x, diff_y))
    }
}

pub struct GridNodeNeighborsIterator<'a, T> {
    grid: &'a Grid<T>,
    node: &'a GridNode<T>,
    idx: usize,
}

impl<'a, T> Iterator for GridNodeNeighborsIterator<'a, T> {
    type Item = (GridDirection, &'a GridNode<T>);

    fn next(&mut self) -> Option<Self::Item> {
        while self.idx < 8 {
            let next_direction = self.direction_from_idx()?;
            let node = self
                .node
                .get_node_in_direction(self.grid, next_direction.clone());
            if let Some(node) = node {
                self.idx += 1;
                return Some((next_direction, node));
            }
            self.idx += 1;
        }
        None
    }
}

impl<'a, T> GridNodeNeighborsIterator<'a, T> {
    pub fn direction_from_idx(&self) -> Option<GridDirection> {
        match self.idx {
            0 => Some(GridDirection::North),
            1 => Some(GridDirection::NorthEast),
            2 => Some(GridDirection::East),
            3 => Some(GridDirection::SouthEast),
            4 => Some(GridDirection::South),
            5 => Some(GridDirection::SouthWest),
            6 => Some(GridDirection::West),
            7 => Some(GridDirection::NorthWest),
            _ => None,
        }
    }
}

pub struct GridNodeDirectionIterator<'a, T> {
    grid: &'a Grid<T>,
    current_node: &'a GridNode<T>,
    direction: GridDirection,
}

impl<'a, T> Iterator for GridNodeDirectionIterator<'a, T> {
    type Item = &'a GridNode<T>;

    fn next(&mut self) -> Option<Self::Item> {
        let node = self
            .current_node
            .get_node_in_direction(self.grid, self.direction.clone())?;
        self.current_node = node;
        Some(node)
    }
}

#[derive(Clone)]
pub enum GridDirection {
    North,
    South,
    East,
    West,
    NorthEast,
    NorthWest,
    SouthEast,
    SouthWest,
}

impl GridDirection {
    pub fn get_offset(&self) -> (isize, isize) {
        match self {
            GridDirection::North => (0, -1),
            GridDirection::South => (0, 1),
            GridDirection::East => (1, 0),
            GridDirection::West => (-1, 0),
            GridDirection::NorthEast => (1, -1),
            GridDirection::NorthWest => (-1, -1),
            GridDirection::SouthEast => (1, 1),
            GridDirection::SouthWest => (-1, 1),
        }
    }

    pub fn from_offset(offset: (isize, isize)) -> Option<GridDirection> {
        match offset {
            (0, -1) => Some(GridDirection::North),
            (0, 1) => Some(GridDirection::South),
            (1, 0) => Some(GridDirection::East),
            (-1, 0) => Some(GridDirection::West),
            (1, -1) => Some(GridDirection::NorthEast),
            (-1, -1) => Some(GridDirection::NorthWest),
            (1, 1) => Some(GridDirection::SouthEast),
            (-1, 1) => Some(GridDirection::SouthWest),
            _ => None,
        }
    }

    pub fn opposite(&self) -> GridDirection {
        match self {
            GridDirection::North => GridDirection::South,
            GridDirection::South => GridDirection::North,
            GridDirection::East => GridDirection::West,
            GridDirection::West => GridDirection::East,
            GridDirection::NorthEast => GridDirection::SouthWest,
            GridDirection::NorthWest => GridDirection::SouthEast,
            GridDirection::SouthEast => GridDirection::NorthWest,
            GridDirection::SouthWest => GridDirection::NorthEast,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_grid() -> Grid<char> {
        let string = "MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX";

        let creation_iter = string.chars().map(|c| {
            if c == '\n' {
                GridCreationItem::Break
            } else {
                GridCreationItem::Item(c)
            }
        });
        Grid::from_iter(creation_iter)
    }

    #[test]
    fn test_grid_from_iter() {
        let grid = make_grid();
        let node = grid.get_node(0, 9).unwrap();
        assert_eq!(node.value, 'M');
    }

    #[test]
    fn test_grid_get_node() {
        let grid = make_grid();
        let node = grid.get_node(0, 0).unwrap();
        assert_eq!(node.value, 'M');

        let node = grid.get_node(1, 1).unwrap();
        assert_eq!(node.value, 'S');
    }

    #[test]
    fn test_grid_neighbors() {
        let grid = make_grid();
        let mut neighbors = grid.get_node(0, 0).unwrap().neighbors(&grid);
        let next_neighbor = neighbors.next().unwrap();
        assert_eq!(next_neighbor.1.value, 'M');

        let next_neighbor = neighbors.next().unwrap();
        assert_eq!(next_neighbor.1.value, 'S');

        let next_neighbor = neighbors.next().unwrap();
        assert_eq!(next_neighbor.1.value, 'M');

        let next_neighbor = neighbors.next();
        assert!(next_neighbor.is_none());
    }

    #[test]
    fn test_directional_iter() {
        let grid = make_grid();
        let node = grid.get_node(0, 0).unwrap();
        let mut iter = node.direction_iter(&grid, GridDirection::South);

        let next_node = iter.next().unwrap();
        assert_eq!(next_node.value, 'M');

        let next_node = iter.next().unwrap();
        assert_eq!(next_node.value, 'A');

        let next_node = iter.next().unwrap();
        assert_eq!(next_node.value, 'M');

        let next_node = iter.next().unwrap();
        assert_eq!(next_node.value, 'X');
    }
}
