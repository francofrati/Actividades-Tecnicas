import { comparation, randomPosition } from "./utils.js";
import inquirer from "inquirer";
import chalk from "chalk"

const bingoCardGenerator = () => {
    const savedNumbers = [];
    const demoCard = [[], [], [], [], [], [], [], [], []];
    while (savedNumbers.length < 15) {
        const randomNumber = Math.floor(Math.random() * 91)
        if (!randomNumber) continue
        if (savedNumbers.includes(randomNumber)) continue
        if (savedNumbers.length < 9) {
            const compareResult = comparation(savedNumbers, randomNumber);
            if (compareResult) {//bug donde me quedaba una columna vacia, entonces primero me aseguro de agregar 1 numero por columna
                if (randomNumber < 10) {
                    demoCard[0].push(randomNumber);
                    savedNumbers.push(randomNumber);
                    continue
                }
                if (randomNumber === 90) {
                    demoCard[8].push(randomNumber);
                    savedNumbers.push(randomNumber);
                    continue
                }
                demoCard[randomNumber.toString()[0]].push(randomNumber);
                savedNumbers.push(randomNumber);
            }
            continue
        }
        if (randomNumber < 10) {
            if (demoCard[0].length < 2) {
                demoCard[0].push(randomNumber);
                savedNumbers.push(randomNumber);
            };
            continue
        }
        if (randomNumber === 90) {
            if (demoCard[8].length < 2) {
                demoCard[8].push(randomNumber);
                savedNumbers.push(randomNumber);
            }
            continue
        }
        if (demoCard[randomNumber.toString()[0]].length < 2) {
            demoCard[randomNumber.toString()[0]].push(randomNumber)
            savedNumbers.push(randomNumber)
        }
    }
    //----------------------- Generando el carton 
    let bingoCard = [];
    for (let i = 0; i < 9; i++) {
        bingoCard.push(new Array(3))
    };
    let count = 0;
    const loopReset = {
        savedNumbersPosition: 0,
        timesRunned: 0
    };
    while (count !== 15) {
        const {savedNumbersPosition,timesRunned} = loopReset;

        if (timesRunned > 30) {
            bingoCard = new Array;
            for (let i = 0; i < 9; i++) {
                bingoCard.push(new Array(3))
            };
            loopReset.savedNumbersPosition = 0;
            loopReset.timesRunned = 0;
            count = 0;
            continue
        }
        if (savedNumbersPosition !== count) {
            loopReset.savedNumbersPosition = count;
            loopReset.timesRunned = 0
        }
        if (savedNumbersPosition === count) {
            loopReset.timesRunned++
        }
        //----agregar por columna aleatoriamente
        let colPosition = randomPosition();
        const currentNumber = savedNumbers[count];
        if (currentNumber < 10) {
            if (bingoCard[0][colPosition] !== undefined) continue
        }
        if (currentNumber === 90) {
            if (bingoCard[8][colPosition] !== undefined) continue
        }
        if (currentNumber > 9 && currentNumber !== 90 && bingoCard[currentNumber.toString()[0]][colPosition] !== undefined) {
            continue
        }
        let rowCounter = 0;
        for (let j = 0; j < 9; j++) {
            if (bingoCard[j][colPosition] !== undefined) {
                rowCounter++
            }
        }
        if (!(rowCounter < 5)) continue
        if (currentNumber < 10) {
            bingoCard[0][colPosition] = currentNumber;
            count++
            continue
        }
        if (currentNumber === 90) {
            bingoCard[8][colPosition] = currentNumber
            count++
            continue
        }
        bingoCard[currentNumber.toString()[0]][colPosition] = currentNumber;
        count++;
    }
    return bingoCard
}

const bingoCard = bingoCardGenerator()

//-----Display del carton en consola

const prompt = inquirer.createPromptModule()

prompt([{
    name: 'name',
    message: 'First name:',
    default: 'Franco'
},
{
    name: 'color',
    message: 'Choose One:',
    choices: ['red', 'green', 'blue', 'magenta'],
    type: 'list'
}])
    .then(({ name, color }) => {
        console.log(chalk[color](
            `     
        |-------------------------------------------|
            ☢☢☢        ${name}'s BINGO      ☢☢☢     
        |-------------------------------------------|
        | ${bingoCard[0][0] ? bingoCard[0][0] : ' '} | ${bingoCard[1][0] ? bingoCard[1][0] : '  '} | ${bingoCard[2][0] ? bingoCard[2][0] : '  '} | ${bingoCard[3][0] ? bingoCard[3][0] : '  '} | ${bingoCard[4][0] ? bingoCard[4][0] : '  '} | ${bingoCard[5][0] ? bingoCard[5][0] : '  '} | ${bingoCard[6][0] ? bingoCard[6][0] : '  '} | ${bingoCard[7][0] ? bingoCard[7][0] : '  '} | ${bingoCard[8][0] ? bingoCard[8][0] : '  '} |                                 
        |   |    |    |    |    |    |    |    |    |                            
        | ${bingoCard[0][1] ? bingoCard[0][1] : ' '} | ${bingoCard[1][1] ? bingoCard[1][1] : '  '} | ${bingoCard[2][1] ? bingoCard[2][1] : '  '} | ${bingoCard[3][1] ? bingoCard[3][1] : '  '} | ${bingoCard[4][1] ? bingoCard[4][1] : '  '} | ${bingoCard[5][1] ? bingoCard[5][1] : '  '} | ${bingoCard[6][1] ? bingoCard[6][1] : '  '} | ${bingoCard[7][1] ? bingoCard[7][1] : '  '} | ${bingoCard[8][1] ? bingoCard[8][1] : '  '} |                            
        |   |    |    |    |    |    |    |    |    |                            
        | ${bingoCard[0][2] ? bingoCard[0][2] : ' '} | ${bingoCard[1][2] ? bingoCard[1][2] : '  '} | ${bingoCard[2][2] ? bingoCard[2][2] : '  '} | ${bingoCard[3][2] ? bingoCard[3][2] : '  '} | ${bingoCard[4][2] ? bingoCard[4][2] : '  '} | ${bingoCard[5][2] ? bingoCard[5][2] : '  '} | ${bingoCard[6][2] ? bingoCard[6][2] : '  '} | ${bingoCard[7][2] ? bingoCard[7][2] : '  '} | ${bingoCard[8][2] ? bingoCard[8][2] : '  '} |                            
         -------------------------------------------
        `
        )
        )
    })