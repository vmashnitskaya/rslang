const formatUrl = (url) =>
    `https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/${url.split('/')[1]}`;

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const getSentences = async (level, option) => {
    const page = Math.floor(option / 2);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
    const res = await window.fetch(url, { method: 'GET' });
    const json = await res.json();
    const currectSet = option % 2 ? json.slice(10, 20) : json.slice(0, 10);
    const sentences = currectSet.map(({ textExample, audioExample, textExampleTranslate }) => {
        const sentence = textExample.replace(/<\/?[^>]+(>|$)/g, '');
        const shuffledArray = shuffle(sentence.slice(0).split(' '));
        const originalArray = sentence.slice(0).split(' ');
        const sentenceLength = sentence.split(' ').length;
        return {
            text: sentence,
            pronunciation: formatUrl(audioExample),
            shuffled: {
                array: shuffledArray,
                first: originalArray[0],
                last: originalArray[sentenceLength - 1],
            },
            originalArray,
            guessedArray: [],
            sentenceLength,
            translation: textExampleTranslate,
        };
    });

    return sentences;
};

export default {
    getSentences,
};
