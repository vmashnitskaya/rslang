export const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const createArrayOfUniqueNumbers = (number, min, max) => {
    const array = [];
    for (let i = 0; i < number; i += 1) {
        let randomNumber = generateRandomNumber(min, max);
        while (array.includes(number)) {
            randomNumber = generateRandomNumber();
        }
        array.push(randomNumber);
    }
    return array;
};
