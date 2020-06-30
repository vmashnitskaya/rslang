import mainGameTypes from './mainGameTypes';

const initialState = {
    mainWords: [],
    currentWordNumber: 0,
    isAutoSoundEnabled: true,
    wordStatus: {
        initial: 'true',
        correctWord: '',
        incorrectWord: '',
    },
};

const mainGameReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case mainGameTypes.SET_WORDS:
            return {
                ...state,
                mainWords: payload,
            };
        case mainGameTypes.SET_CURRENT_WORD_NUMBER:
            return {
                ...state,
                currentWordNumber: payload,
            };
        case mainGameTypes.SET_AUTO_SOUND_ENABLED:
            return {
                ...state,
                isAutoSoundEnabled: payload,
            };
        case mainGameTypes.SET_CORRRECT_WORD_PROVIDED:
            return {
                ...state,
                wordStatus: { initial: '', incorrectWord: '', correctWord: payload },
            };
        case mainGameTypes.SET_INCORRRECT_WORD_PROVIDED:
            return {
                ...state,
                wordStatus: { initial: '', incorrectWord: payload, correctWord: '' },
            };
        case mainGameTypes.SET_INITIAL_STATE:
            return {
                ...state,
                wordStatus: { initial: payload, incorrectWord: '', correctWord: '' },
            };
        default:
            return state;
    }
};

export default mainGameReducer;
