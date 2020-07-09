const getWords = async (page, group) => {
    try {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
        const res = await fetch(url);
        const content = await res.json();
        return { data: content, error: null };
    } catch (error) {
        return { error, data: null };
    }
};

export default getWords;
