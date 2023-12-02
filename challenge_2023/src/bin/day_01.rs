use std::fs::File;
use std::io::Read;
use std::{array, cmp};

const ARRAY_NUMBERS: [(&str, u32); 9] = [
    ("one", 1),
    ("two", 2),
    ("three", 3),
    ("four", 4),
    ("five", 5),
    ("six", 6),
    ("seven", 7),
    ("eight", 8),
    ("nine", 9),
];

fn main() {
    let mut file = File::open("./inputs/day1").expect("Unable to open");
    let mut contents = String::new();
    file.read_to_string(&mut contents);

    let mut sum = 0;
    contents = contents.replace("one", "o1e");
    contents = contents.replace("two", "t2o");
    contents = contents.replace("three", "t3ree");
    contents = contents.replace("four", "f4ur");
    contents = contents.replace("five", "f5ve");
    contents = contents.replace("six", "s6x");
    contents = contents.replace("seven", "s7ven");
    contents = contents.replace("eight", "e8ght");
    contents = contents.replace("nine", "ni9e");
    for line in contents.split_whitespace() {
        let number = get_number(&line);
        sum += number
    }
    println!(">> Total Sum : {sum} ")
}

fn replace_numbers(line: &str) -> String {

    let mut new_line = line.to_string();
    for c in line.chars() {
        let mut first_pair = (99999, ("bite", 0));
        for n in ARRAY_NUMBERS {
            let number = match new_line.find(n.0) {
                Some(found) => found,
                None => continue,
            };
            if number < first_pair.0 {
                first_pair = (number, n);
            }
        }
        new_line = new_line.replacen(first_pair.1 .0, &first_pair.1 .1.to_string(), 1);
    }


    // let mut last_pair = (0, ("bite", 0));
    // for n in ARRAY_NUMBERS {
    //     let number = match new_line.rfind(n.0) {
    //         Some(found) => found,
    //         None => continue,
    //     };
    //     if number >= last_pair.0 {
    //         last_pair = (number, n);
    //     }
    // }
    // let mut nl = new_line[..last_pair.0].to_string();

    // if last_pair.1.0 == "bite" {
    //     return new_line 
    // }

    // nl.push_str(&last_pair.1.1.to_string());
    // let restart_idx = last_pair.0 + last_pair.1.0.len();
    // nl.push_str(&new_line[restart_idx..]);

    return new_line.to_string();
}

fn get_number(line: &str) -> u32 {
    // Two pointer loop on the string
    let mut res: String = String::new();
    for (i, c) in line.chars().enumerate() {
        if c.is_numeric() {
            res += &c.to_string();
            break;
        }
    }
    for c in line.chars().rev() {
        if c.is_numeric() {
            res += &c.to_string();
            break;
        }
    }
    return res.parse().unwrap();
}
