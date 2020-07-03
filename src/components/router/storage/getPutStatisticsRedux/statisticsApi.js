const getUserStatistics = async (userId, token) => {
    const rawResponse = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
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

const putUserStatistics = async (userId, token, statistics) => {
    const rawResponse = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
        {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statistics),
        }
    );
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else if (rawResponse.status === 400) {
        return undefined;
    } else if (rawResponse.status === 401) {
        return undefined;
    }
    return content;
};

export default { getUserStatistics, putUserStatistics };
