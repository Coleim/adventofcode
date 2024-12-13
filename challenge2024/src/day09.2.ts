
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
    for( let j = 0; j < numberOfBlocks; j++) {
        blocks.push(charToPut)
    }
}

function moveToPrevChar(pos: number, blocks: string[]) {
    while(blocks[pos] === '.' && pos > 0) {
        --pos;
    }
    return pos;
}
function getContiguousData(pos: number, blocks: string[]): number {
    while(blocks[pos] === blocks[pos - 1] && pos > 0) {
        --pos;
    }
    return pos;
}

function findFirstSpaceOfSize(len: number, posEnd: number, blocks: string[]) {
    let start = 0
    while( start < posEnd) {
        while(blocks[start] !== '.' && start < posEnd) {
            ++start;
        }
        if( start >= posEnd) {
            return -1;
        }    
        let count = 0;
        while(blocks[start+count] === '.' && start+count < posEnd) {
            ++count;
        }
        if(count >= len) {
            return start
        }
        start += count;
    }
    return -1;
}

function swapChar(startF: number, len: number, startT: number, blocks: string[]) {
    for(let i = 0; i < len; i++) {
        blocks[startF+i] = blocks[startT+i]
        blocks[startT+i] = '.'
    }
}

for( let pEnd = blocks.length - 1; pEnd >= 0; pEnd--) {
    pEnd = moveToPrevChar(pEnd, blocks)
    const pbeg = getContiguousData(pEnd, blocks)
    const len = pEnd - pbeg + 1

    const startSpace = findFirstSpaceOfSize(len, pbeg, blocks)
    if( startSpace !== -1) {
        swapChar(startSpace, len, pbeg, blocks);
    }
    pEnd = pbeg;
}

console.log( blocks.join('') )
let checksum = 0;
for(let i = 0; i < blocks.length; i++) {
    if( blocks[i] !== '.') {
        checksum += Number(blocks[i])*i
    }
}

console.log(checksum)
