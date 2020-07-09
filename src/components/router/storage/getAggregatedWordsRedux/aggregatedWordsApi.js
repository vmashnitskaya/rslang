const formatUrl = (url) =>
    `https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/${url.split('/')[1]}`;

const formatString = (string) => {
    return string.replace(/<\/?[^>]+(>|$)/g, '');
};

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

const getAggregatedWords = async (userId, token, wordsPerPage, filter) => {
    const filtering = JSON.stringify(filter);
    const paramsStr = `&wordsPerPage=${wordsPerPage * 3}&filter=${filtering}`;
    const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?${paramsStr}`;

    const rawResponse = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    let content = '';
    if (rawResponse.status === 200) {
        const data = await rawResponse.json();
        if (!data[0].paginatedResults.length) {
            content = null;
        } else {
            const shuffled = shuffle(data[0].paginatedResults).slice(0, wordsPerPage);
            content = shuffled.map(
                ({
                    word,
                    image,
                    audio,
                    textExample,
                    textMeaning,
                    audioMeaning,
                    audioExample,
                    ...other
                }) => ({
                    word: word.toLowerCase(),
                    image: formatUrl(image),
                    audio: formatUrl(audio),
                    audioMeaning: formatUrl(audioMeaning),
                    audioExample: formatUrl(audioExample),
                    textExample: formatString(textExample),
                    textMeaning: formatString(textMeaning),
                    ...other,
                })
            );
        }
    } else if (rawResponse.status === 401) {
        throw new Error('Wrong token');
    }
    console.log(content);
    return content;
};

export default { getAggregatedWords };
