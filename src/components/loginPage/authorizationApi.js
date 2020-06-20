const createUser = async (user) => {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else if (rawResponse.status === 422) {
        throw new Error('Incorrect e-mail or password');
    } else {
        throw new Error('');
    }
    return content;
};

const loginUser = async (user) => {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    let content = '';
    if (rawResponse.status === 200) {
        content = await rawResponse.json();
    } else {
        throw new Error('Incorrect e-mail or password');
    }
    return content;
};

export { createUser, loginUser };
