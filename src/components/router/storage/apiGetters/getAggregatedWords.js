const getAggregatedWords = async (params) => {
    const { userId, token, group, filter, wordsPerPage } = params;
    const paramsStr = `group=${group}&wordsPerPage=${wordsPerPage}&filter=${filter}`;
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
        content = await rawResponse.json();
    } else if (rawResponse.status === 401) {
        throw new Error('Wrong token');
    }
    return content;
};

export default getAggregatedWords;
