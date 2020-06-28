import mainGameTypes from './mainGameTypes';

const speakItActions = {
    setMainWords: (words) => ({
        type: mainGameTypes.SET_WORDS,
        payload: words,
    }),
};

export default speakItActions;
