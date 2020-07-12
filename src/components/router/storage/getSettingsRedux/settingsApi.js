const getUserSettings = async (userId, token) => {
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
        return undefined;
    } else if (rawResponse.status === 404) {
        return undefined;
    }
    return content;
};

const putUserSettings = async (userId, token, settings) => {
    const rawResponse = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
        {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        }
    );
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else if (rawResponse.status === 401) {
        return undefined;
    } else if (rawResponse.status === 404) {
        return undefined;
    }
    return content;
};

export default { getUserSettings, putUserSettings };
