const getUserSettings = async ({ userId, token }) => {
    const rawResponse = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
        {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }
    );
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else if (rawResponse.status === 401) {
        throw new Error(`Access token is missing or invalid`);
    } else if (rawResponse.status === 404) {
        throw new Error(`Settings not found`);
    }
    return content;
};

export default getUserSettings;
