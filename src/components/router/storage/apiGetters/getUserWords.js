const getUserWords = async ({ userId, token }) => {
    try {
        const rawResponse = await fetch(
            `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`,
            {
                method: 'GET',
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

export default getUserWords;
