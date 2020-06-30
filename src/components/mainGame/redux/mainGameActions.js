import mainGameTypes from './mainGameTypes';

const mainGameActions = {
    setMainWords: (words) => ({
        type: mainGameTypes.SET_WORDS,
        payload: words,
    }),
    setCurrentWordNumber: (number) => ({
        type: mainGameTypes.SET_CURRENT_WORD_NUMBER,
        payload: number,
    }),
    setAutoSoundEnabled: (isAutoSoundEnabled) => ({
        type: mainGameTypes.SET_AUTO_SOUND_ENABLED,
        payload: isAutoSoundEnabled,
    }),
    setCorrectWordProvided: (isCorrectWordProvided) => ({
        type: mainGameTypes.SET_CORRRECT_WORD_PROVIDED,
        payload: isCorrectWordProvided,
    }),
    setIncorrectWordProvided: (isIncorrectWordProvided) => ({
        type: mainGameTypes.SET_INCORRRECT_WORD_PROVIDED,
        payload: isIncorrectWordProvided,
    }),
    setInitialState: (initialState) => ({
        type: mainGameTypes.SET_INITIAL_STATE,
        payload: initialState,
    }),
};

export default mainGameActions;
