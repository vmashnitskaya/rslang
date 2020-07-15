import Randomizer from './Randomizer';

export default function ShuffleObjCollection(arrayObjects) {
    let mixArray = JSON.parse(JSON.stringify(arrayObjects));
    if (typeof arrayObjects === 'string') {
        mixArray = mixArray.split('');
    }
    for (let i = mixArray.length - 1; i >= 0; i -= 1) {
        const randomIndex = Randomizer(i);
        const currentObj = mixArray[randomIndex];
        mixArray[randomIndex] = mixArray[i];
        mixArray[i] = currentObj;
    }
    if (typeof arrayObjects === 'string') {
        mixArray = mixArray.join('');
        if (arrayObjects === mixArray) {
            return ShuffleObjCollection(arrayObjects);
        }
    }
    return mixArray;
}
