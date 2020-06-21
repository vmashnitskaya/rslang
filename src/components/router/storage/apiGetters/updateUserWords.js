const updateUserWords = async ({ userId, token, wordId }) => {
    try {
        const rawResponse = await fetch(
            `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
            {
                method: 'PUT',
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }
        );
        const content = await rawResponse.json();
        return { data: content, error: null };
    } catch (error) {
        return { error, data: null };
    }
};

export default updateUserWords;