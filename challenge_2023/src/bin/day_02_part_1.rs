use std::fs::File;
use std::io::{BufRead, BufReader};

// "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
// "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
// "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
// "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
// "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"

// only 12 red cubes, 13 green cubes, and 14 blue cubes
// 1 + 2 + 5

#[derive(Debug)] // Derive Debug trait for GameSet
struct GameSet {
    blue: u32,
    red: u32,
    green: u32,
}
fn main() {
    let file = File::open("./inputs/day2").expect("Unable to open");
    let reader = BufReader::new(file);

    let mut sum = 0;
    for line in reader.lines() {
        let (game_id, sets) = parse_line(line.unwrap());
        println!(" Game id : {:?} " , game_id);
        println!(" Game sets : {:?} " , sets);
        if is_game_possible(sets) {
            sum += game_id;
        }
    }


    println!(">> Total Sum : {sum} ")
}

fn is_game_possible(sets: Vec<GameSet>) -> bool {
    for set in sets {
        if set.blue > 14 || set.green > 13 || set.red > 12 { return false }
    }
    return true
}

fn parse_line(line: String) -> (u32, Vec<GameSet>) {
    println!(">> line : {:?} ", line);

    let splits: Vec<&str> = line.split(": ").collect();
    let game_id = splits.first().unwrap().split(' ').rev().next().unwrap().parse().unwrap();
    println!("game_id: {} " , game_id);
    let sets_data: Vec<&str> = splits.last().unwrap().split("; ").collect();

    let mut game_sets: Vec<GameSet> = vec![];

    for set in sets_data {
        let col_data: Vec<&str> = set.split(", ").collect();
        // Create a GameSet instance
        let mut game_set = GameSet {
            blue: 0,
            red: 0,
            green: 0,
        };
        for col in col_data {
            let mut col_split = col.split(' ');
            println!("col_split: {:?} " , col_split);
            let count: u32 = col_split.next().unwrap().parse().unwrap();
            println!("Count: {} " , count);
            let color = col_split.next().unwrap();
            match color {
                "blue" => game_set.blue = count,
                "red" => game_set.red = count,
                "green" => game_set.green = count,
                _ => println!("Should not occur"), // Handle other cases if needed
            }
        }
        game_sets.push(game_set);

    }

    // Return the values as a tuple
    return (game_id, game_sets)
}
