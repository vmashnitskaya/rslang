function shuffle(arr) {
    const array = arr;
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const gameState = {
    NOT_STARTED: 0,
    LOADING_DATA: 1,
    IN_PROGRESS: 2,
    FINISHED: 3,
};

const createGroupPlan = () => {
    const pages = [];
    for (let i = 0; i < 30; i += 1) {
        pages.push(i);
    }
    shuffle(pages);
    return pages;
};

export default {
    shuffle,
    gameState,
    createGroupPlan,
};
