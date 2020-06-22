const formatUrl = (url) =>
    `https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/${url.split('/')[1]}`;

const fetchWords = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await window.fetch(url, { method: 'GET' });
    const json = await res.json();
    const words = json.map(({ word, image, audio, ...other }) => ({
        word: word.toLowerCase(),
        image: formatUrl(image),
        audio: formatUrl(audio),
        ...other,
    }));
    return words;
};

export default {
    fetchWords,
};
