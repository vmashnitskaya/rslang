const formatUrl = (url) =>
    `https://raw.githubusercontent.com/vmashnitskaya/rslang-data/master/data/${url.split('/')[1]}`;

const formatString = (string) => {
    return string.replace(/<\/?[^>]+(>|$)/g, '');
};

const getAggregatedWords = async (userId, token, wordsPerPage) => {
    const filter = JSON.stringify({ userWord: null });
    const paramsStr = `&wordsPerPage=${wordsPerPage}&filter=${filter}`;
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
        content = data[0].paginatedResults.map(
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
    } else if (rawResponse.status === 401) {
        throw new Error('Wrong token');
    }
    return content;
};

export default { getAggregatedWords };
