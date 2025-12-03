use std::str::Bytes;

pub struct StringWindowsIter<'a> {
    s_len: usize,
    idx: usize,
    window_size: usize,
    current_window: Vec<char>,
    bytes_iter: Bytes<'a>,
}

impl<'a> StringWindowsIter<'a> {
    pub fn new(s: &'a str, window_size: usize) -> Self {
        Self {
            s_len: s.len(),
            idx: 0,
            window_size,
            current_window: Vec::new(),
            bytes_iter: s.bytes(),
        }
    }
}

impl<'a> Iterator for StringWindowsIter<'a> {
    type Item = Vec<char>;

    fn next(&mut self) -> Option<Self::Item> {
        let next_idx = self.idx + self.window_size;
        if next_idx >= self.s_len {
            return None;
        }

        let window = self
            .bytes_iter
            .by_ref()
            .take(self.window_size)
            .map(|b| b as char)
            .collect::<Vec<_>>();

        self.idx += 1;

        Some(window)
    }
}
