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
    isTranslationEnabled: true,
    learnedWordsNumber: 0,
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
        case mainGameTypes.INCREASE_CURRENT_WORD_NUMBER:
            return {
                ...state,
                currentWordNumber: state.currentWordNumber + 1,
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
        case mainGameTypes.SET_IS_TRANSLATION_ENABLED:
            return {
                ...state,
                isTranslationEnabled: payload,
            };
        case mainGameTypes.SET_LEARNED_WORDS_NUMBER:
            return {
                ...state,
                learnedWordsNumber: payload,
            };
        case mainGameTypes.ADD_NEW_WORD: {
            const newArray = state.mainWords.slice(0);
            const random =
                payload.currentNumber +
                Math.random() * (state.mainWords.length - payload.currentNumber);
            newArray.splice(Math.round(random), 1, payload.newWord);
            return {
                ...state,
                mainWords: newArray,
            };
        }
        default:
            return state;
    }
};

export default mainGameReducer;
