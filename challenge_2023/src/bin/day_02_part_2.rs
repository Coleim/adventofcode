use std::fs::File;
use std::io::{BufRead, BufReader};

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green


// In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. 
// If any color had even one fewer cube, the game would have been impossible.
// Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
// Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
// Game 4 required at least 14 red, 3 green, and 15 blue cubes.
// Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.


// 4*2*6 = 48
// The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. 
// The power of the minimum set of cubes in game 1 is 48. 
// In games 2-5 it was 12, 1560, 630, and 36, respectively. 
// Adding up these five powers produces the sum 2286.


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
        sum += get_power_of(sets);
    }


    println!(">> Total Sum : {sum} ")
}

fn get_power_of(sets: Vec<GameSet>) -> u32 {
    let mut max_of_red = 0;
    let mut max_of_green = 0;
    let mut max_of_blue = 0;
    
    for set in sets {
        if set.blue > max_of_blue {
            max_of_blue = set.blue 
        }
        if set.red > max_of_red {
            max_of_red = set.red 
        }
        if set.green > max_of_green {
            max_of_green = set.green 
        }
    }

    return max_of_red * max_of_blue * max_of_green; 
}

fn parse_line(line: String) -> (u32, Vec<GameSet>) {
    // println!(">> line : {:?} ", line);

    let splits: Vec<&str> = line.split(": ").collect();
    let game_id = splits.first().unwrap().split(' ').rev().next().unwrap().parse().unwrap();
    // println!("game_id: {} " , game_id);
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
            let count: u32 = col_split.next().unwrap().parse().unwrap();
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
