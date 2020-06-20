const formatUrl = (url) =>
    `https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/${url.split('/')[1]}`;

const getTranslations = async (words) => {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T170620Z.55c8b9394267ab3a.3447d744700d3f2e8e6216551e211e2089052f54&lang=en-ru${words
        .map((word) => `&text=${word}`)
        .join('')}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.text.map((translation) => translation.toLowerCase());
};

const getCards = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await window.fetch(url, { method: 'GET' });
    const json = await res.json();
    let cards = json.map(({ word, image, audio, transcription }) => ({
        word: word.toLowerCase(),
        image: formatUrl(image),
        audio: formatUrl(audio),
        transcription,
    }));
    cards = cards.slice(0, 10);
    const translations = await getTranslations(cards.map(({ word }) => word));
    translations.forEach((translation, index) => {
        cards[index].translation = translation;
    });
    return cards;
};

export default {
    getCards,
};
