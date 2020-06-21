const getWords = async () => {
    try {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
        const res = await fetch(url);
        const content = await res.json();
        dispatch({ type: 'FETCH_WORDS_SUCCESS', payload: [] });
    } catch (error) {
        return { error, data: null };
    }
};

export default getWords;
