
import { readFileSync } from 'fs';
const fileStr = readFileSync('inputs/day09','utf8');

console.log(fileStr)
let idx = 0
const blocks: string[] = []
for (let i = 0 ; i < fileStr.length; i++) {
    const numberOfBlocks = Number(fileStr[i]);
    let charToPut = '.'
    if( i % 2 === 0) {
        charToPut = idx.toString()
        ++idx;
    }
    console.log("Putting ", charToPut, " - ", numberOfBlocks)
    for( let j = 0; j < numberOfBlocks; j++) {
        blocks.push(charToPut)
    }
}

console.log(blocks);

function moveToNextDot(pos: Position, blocks: string[]) {
    while(blocks[pos.start] !== '.' && pos.start < pos.end) {
        ++pos.start;
    }
}
function moveToPrevChar(pos: Position, blocks: string[]) {
    while(blocks[pos.end] === '.' && pos.start < pos.end) {
        --pos.end;
    }
}
function swapChar(pos: Position, blocks: string[]) {
    const temp = blocks[pos.start];
    blocks[pos.start] = blocks[pos.end];
    blocks[pos.end] = temp;
}

interface Position {
    start: number,
    end: number
}

let pos: Position = { start: 0, end: blocks.length - 1}

// while not the same
while(pos.start < pos.end) {
    moveToNextDot(pos, blocks);
    moveToPrevChar(pos, blocks);
    swapChar(pos, blocks);
    pos.start++
    pos.end--
}

console.log( blocks.join('') );
const blockNoDot = blocks.filter((block) => block !== '.');
console.log( blockNoDot.join('') );
let checksum = 0;
for(let i = 0; i < blockNoDot.length; i++) {
    checksum += Number(blockNoDot[i])*i
}

console.log(checksum)
