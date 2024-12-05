
import { warn } from 'console';
import { readFileSync } from 'fs';
import { argv0 } from 'process';


const file = readFileSync('inputs/day02', 'utf8');

let safeCount = 0

function isSafe(cols: string[]): boolean {
    let increase: boolean | undefined = undefined
    let isSafe = true
    // console.log("Checking : ", cols)
    for (let i = 0; i < cols.length - 1; ++i) {
        const diff: number = Number(cols[i]) - Number(cols[i + 1])
        // console.log("diff: ", diff)
        const localIncrease = diff > 0 ? true : false
        if (increase === undefined) {
            increase = localIncrease
        }
        // console.log(cols[i], " - ", cols[i + 1])
        // console.log("diff: ", diff)
        if (localIncrease !== increase) {
            isSafe = false
            break;
        }
        if (Math.abs(diff) === 0) {
            isSafe = false;
            break;
        }

        if (Math.abs(diff) > 3) {
            isSafe = false;
            // console.log(Math.abs(diff), " is not safe")
            break;
        }
        // console.log(diff)

    }
    return isSafe
}

file.split(/\r?\n/).filter(line => line !== "").forEach(function (line) {

    const cols = line.split(' ')
    if( isSafe(cols) ) {
        // console.log("IS SAFE")
        safeCount++
    } else {
        // try removing 1 char
        let foundSafe = false
        // console.log("IS NOT SAFE BUT ...")
        for (let i = 0; i < cols.length; ++i) {
            if( isSafe(cols.toSpliced(i, 1)) ) {
                // console.log("FOUND ONE SAFE")
                foundSafe = true
                safeCount++
                break
            }
        }

        if( !foundSafe ) {
            console.log( "NOT SAFE : " , line)
        }

    }
})

console.log(safeCount)
