const getUserStatistics = async ({ userId, token }) => {
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
        throw new Error(`Access token is missing or invalid`);
    } else if (rawResponse.status === 404) {
        throw new Error(`Statistics not found`);
    }
    return content;
};

export default getUserStatistics;
