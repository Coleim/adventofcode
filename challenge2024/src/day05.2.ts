
import { readFileSync } from 'fs';


const file = readFileSync('inputs/day05','utf8');

let parsePriorities = true
const priorityMap = new Map<number, number[]>();

const printingRules: number[][] = [];
const incorrectRules: number[][] = [];
file.split(/\r?\n/).forEach(function(line){
    if( line.length === 0) {
        parsePriorities = false
        return
    }
    if( parsePriorities ) {
        const linesplit = line.split('|')
        const first = Number(linesplit[0])
        const second = Number(linesplit[1])
        if( priorityMap.has(first) ) {
            const current = priorityMap.get(first)
            if( current ) {
                current.push(second)
                priorityMap.set(first, current)
            }
        } else {
            priorityMap.set(first, [second])
        }
    } else {
        const pageupdate = line.split(',').map( (x) => Number(x) )
        const newpagesort = [...pageupdate].sort( (a,b) => {
            if( priorityMap.has(a) ) {
                const second = priorityMap.get(a)
                if( second ) {
                    if( second.includes(b) ) {
                        return -1
                    }
                }
            }
            if( priorityMap.has(b) ) {
                const second = priorityMap.get(b)
                if( second ) {
                    if( second.includes(a) ) {
                        return 1
                    }
                }
            }
            return 0
        })
        if( newpagesort.every((value, index) => value === pageupdate[index]) ) {
            printingRules.push(pageupdate.map( (x) => x ))
        } else {
            incorrectRules.push(newpagesort.map( (x) => x ))
        }
    }
})

let sum = 0;
printingRules.forEach( (rule) => {
    const middle = rule[Math.trunc(rule.length/2)]
    sum += middle
})

console.log("incorrectRules: " , incorrectRules)
let incorrectSum = 0;
incorrectRules.forEach( (rule) => {
    const middle = rule[Math.trunc(rule.length/2)]
    incorrectSum += middle
})

console.log("SUM: " , sum);
console.log("incorrectSum: " , incorrectSum);