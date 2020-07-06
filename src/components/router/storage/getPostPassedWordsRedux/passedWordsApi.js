const postPassedWords = async (userId, token, wordId, word) => {
    const rawResponse = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
        {
            method: 'POST',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(word),
        }
    );
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else if (
        rawResponse.status === 400 ||
        rawResponse.status === 401 ||
        rawResponse.status === 417
    ) {
        return undefined;
    }
    return content;
};

const putPassedWords = async (userId, token, wordId, word) => {
    const rawResponse = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
        {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(word),
        }
    );
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else if (
        rawResponse.status === 400 ||
        rawResponse.status === 401 ||
        rawResponse.status === 417
    ) {
        return undefined;
    }
    return content;
};

export default { postPassedWords, putPassedWords };
