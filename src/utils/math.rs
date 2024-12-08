pub fn gcd(mut a: isize, mut b: isize) -> isize {
    while a != 0 {
        let old_a = a;
        a = b % a;
        b = old_a;
    }

    b
}
