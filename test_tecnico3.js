const comparation = (array, number) => {
    if (number < 10) {
        if (!(array.find((n) => n < 10))) return true
        return false
    }
    if (number > 79 && number < 91) {
        if (!(array.find((n) => n > 79 && n < 91))) return true
        return false
    }
    if (!(array.find((n) => n.toString().length === 2 && number.toString()[0] === n.toString()[0]))) {
        return true
    }
    return false
}

const randomPosition = (array) => {
    const randomPosition = Math.floor(Math.random() * 3)
    return randomPosition
}

const bingo = () => {
    const counter = [];
    const bingoCard = [[], [], [], [], [], [], [], [], []];
    // bingoCard.forEach((a)=>a.push(undefined));
    while (counter.length < 15) {
        const randomNumber = Math.floor(Math.random() * 91)
        if (!randomNumber) continue
        if (counter.includes(randomNumber)) continue
        if (counter.length < 9) {
            const compareResult = comparation(counter, randomNumber);
            if (compareResult) {
                if (randomNumber < 10) {
                    if (bingoCard[0].length < 2) {
                        bingoCard[0].push(randomNumber)
                        counter.push(randomNumber)
                        // console.log(randomNumber, 30)
                    }
                    continue
                }
                if (randomNumber === 90) {
                    if (bingoCard[8].length < 2) {
                        bingoCard[8].push(randomNumber)
                        counter.push(randomNumber)
                        // console.log(randomNumber, 38)
                    }
                    continue
                }
                if (bingoCard[randomNumber.toString()[0]].length < 2) {
                    bingoCard[randomNumber.toString()[0]].push(randomNumber)
                    counter.push(randomNumber)
                    // console.log(randomNumber, 45)
                }
            }
            continue
        }
        if (randomNumber < 10) {
            if (bingoCard[0].length < 2) {
                bingoCard[0].push(randomNumber)
                counter.push(randomNumber)
                // console.log(randomNumber)
            }
            continue
        }
        if (randomNumber === 90) {
            if (bingoCard[8].length < 2) {
                bingoCard[8].push(randomNumber)
                counter.push(randomNumber)
                // console.log(randomNumber)
            }
            continue
        }
        if (bingoCard[randomNumber.toString()[0]].length < 2) {
            bingoCard[randomNumber.toString()[0]].push(randomNumber)
            counter.push(randomNumber)
            // console.log(randomNumber)
        }
    }
    // bingoCard.forEach((a)=>a.push(undefined))
    // console.log(counter)
    // console.table(bingoCard)
    let bingoCard2 = new Array;
    for (let i = 0; i < 9; i++) {
        bingoCard2.push(new Array(3))
    }
    // console.log(bingoCard2)

    //----------------------------
    counter.sort((a, b) => a - b)
    let numberCheck = 0
    const bugReset = {
        counterPosition: 0,
        timesRunned: 0
    }
    while (numberCheck !== 15) {
        console.log(numberCheck, 'NumberCheck')
        if (bugReset.timesRunned > 30) {
            bingoCard2 = new Array;
            for (let i = 0; i < 9; i++) {
                bingoCard2.push(new Array(3))
            }
            bugReset.counterPosition =0;
            bugReset.timesRunned = 0
            numberCheck = 0;
            continue
        }
        if (bugReset.counterPosition !== numberCheck) {
            bugReset.counterPosition =numberCheck;
            bugReset.timesRunned = 0
        }
        if (bugReset.counterPosition === numberCheck) {
            bugReset.timesRunned++
        }
        console.log({
            numbercheck:bugReset.counterPosition,
            times :bugReset.timesRunned
        })
        let position = randomPosition();
        console.log(position, 'pos')
        const currentNumber = counter[numberCheck];
        console.log(currentNumber)
        let rowCount = 0;
        if (currentNumber < 10) {
            if (bingoCard2[0][position] !== undefined) {
                continue
            }
        }
        console.log('Linea, 101')
        if (currentNumber === 90) {
            if (bingoCard2[8][position] !== undefined) continue
        }
        console.log('Linea, 105')
        if (currentNumber > 9 && currentNumber !== 90 && bingoCard2[currentNumber.toString()[0]][position] !== undefined) {
            continue
        }
        console.log('Linea, 109')
        for (let j = 0; j < 9; j++) {
            if (bingoCard2[j][position] !== undefined) {
                rowCount++
            }
        }
        console.log('Linea, 115')
        if (!(rowCount < 5)) continue
        console.log('row mayor a 5')
        if (currentNumber < 10) {
            bingoCard2[0][position] = currentNumber;
            numberCheck++
            console.log(bingoCard2)
            continue
        }
        console.log('Linea, 122')
        if (currentNumber === 90) {
            bingoCard2[8][position] = currentNumber
            numberCheck++
            console.log(bingoCard2)
            continue
        }
        console.log('Linea, 128')
        bingoCard2[currentNumber.toString()[0]][position] = currentNumber;
        numberCheck++;
        console.log(bingoCard2)
        console.log('fin')
    }

    console.log(bingoCard2)

}

bingo()

// const Carton = () => {
//     let numberCheck = 0
//     while (numberCheck !== 15) {
//         let position = randomPosition();
//         const currentNumber = counter[numberCheck];
//         let rowCount = 0;
//         if(currentNumber<10){
//             if(bingoCard2[0][position] !== undefined){
//                 continue
//             }
//         }
//         if(currentNumber===90){
//             if(bingoCard2[8][position]!==undefined)continue
//         }
//         if (bingoCard2[currentNumber[0]][position] !== undefined) {
//             continue
//         }
//         for (let j = 0; j < 9; j++) {
//             if(bingoCard2[j][position]!==undefined){
//                 rowCount++
//             }
//         }
//         if(!(rowCount<5))continue
//         if(currentNumber<10){
//             bingoCard2[0][position] = currentNumber;
//             numberCheck++
//             continue
//         }
//         if(currentNumber === 90){
//             bingoCard2[8][position]=currentNumber
//             numberCheck++
//             continue
//         }
//         bingoCard2[currentNumber.toString()[0]][position]= currentNumber;
//         numberCheck++;

//     }

// }