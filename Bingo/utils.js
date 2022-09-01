export const comparation = (array, number) => {
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

export const randomPosition = (array) => {
    const randomPosition = Math.floor(Math.random() * 3)
    return randomPosition
}