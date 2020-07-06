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
    increaseCurrentWordNumber: () => ({
        type: mainGameTypes.INCREASE_CURRENT_WORD_NUMBER,
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
    setIsTranslationEnabled: (isTranslationEnabled) => ({
        type: mainGameTypes.SET_IS_TRANSLATION_ENABLED,
        payload: isTranslationEnabled,
    }),
    setLearnedWordsNumber: (learnedWordsNumber) => ({
        type: mainGameTypes.SET_LEARNED_WORDS_NUMBER,
        payload: learnedWordsNumber,
    }),
    addNewWord: (newWord, currentNumber) => ({
        type: mainGameTypes.ADD_NEW_WORD,
        payload: { newWord, currentNumber },
    }),
};

export default mainGameActions;
