
import { readFileSync } from 'fs';
type Position = {
    x: number,
    y: number
};

const file = readFileSync('inputs/day08','utf8');

const map: string[][] = [];
file.split(/\r?\n/).forEach(function(line){
    map.push(line.split(''))
})
const nodesMap = new Map<string, Position[]>();
for(let y = 0; y < map.length; y++) {
    for(let x = 0; x < map[y].length; x++) {
        const char = map[y][x]
        if(char !== '.') {
            if(nodesMap.has(char)) {
                nodesMap.get(char)!.push({x, y})
            } else {
                nodesMap.set(char, [{x, y}])
            }
        }
    }
}

console.log(map.map((line) => line.join('')).join('\n'))


// For each nodes in the map
// 1. calculate the distance between the two points
// 2. apply antinode to the distance lower bound
// 3. apply the antinode to the distance upper bound
// 4. check if the antinode is in the map
// 5. if it is, then add it to the map

let antinodeCount = 0;
nodesMap.forEach((positions) => {
    for(let p1 = 0 ; p1 < positions.length; p1++) {
        const node1 = positions[p1];
        for(let p2 = 0 ; p2 < positions.length; p2++) {
            const node2 = positions[p2];
            if(node1 !== node2) {
                const x = Math.abs(node1.x - node2.x);
                const y = Math.abs(node1.y - node2.y);
                const antinode1 = {x: 0, y: 0};
                const antinode2 = {x: 0, y: 0};
                let n = 0
                while ( map[antinode1.y] && map[antinode1.y][antinode1.x] !== undefined) {
                    if(node1.x < node2.x) {
                        antinode1.x = node1.x - n*x;
                    } else {
                        antinode1.x = node1.x + n*x;
                    }
                    if(node1.y < node2.y) {
                        antinode1.y = node1.y - n*y;
                    } else {
                        antinode1.y = node1.y + n*y;
                    }
                    ++n;
                    if(map[antinode1.y] && map[antinode1.y][antinode1.x] !== undefined && (map[antinode1.y][antinode1.x] !== '#')) {
                        map[antinode1.y][antinode1.x] = '#';
                        antinodeCount++;
                    }
                }
                n = 0
                while ( map[antinode2.y] && map[antinode2.y][antinode2.x] !== undefined) {
                    if(node1.x < node2.x) {
                        antinode2.x = node2.x + n*x;
                    } else {
                        antinode2.x = node2.x - n*x;
                    }
                    if(node1.y < node2.y) {
                        antinode2.y = node2.y + n*y;
                    } else {
                        antinode2.y = node2.y - n*y;
                    }
                    ++n;
                    if(map[antinode2.y] && map[antinode2.y][antinode2.x] !== undefined  && (map[antinode2.y][antinode2.x] !== '#')) {
                        map[antinode2.y][antinode2.x] = '#';
                        antinodeCount++;
                    }
                }
            }
        }
    }
})


console.log(`antinodeCount: `, antinodeCount)



console.log('----')
console.log(map.map((line) => line.join('')).join('||\n'))