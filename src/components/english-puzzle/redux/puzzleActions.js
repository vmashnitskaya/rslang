import puzzleTypes from './puzzleTypes';

const puzzleActions = {
    setPagination: (pagination) => ({
        type: puzzleTypes.SET_PAGINATION,
        payload: pagination,
    }),
    setLevelPassed: (levelPassed) => ({
        type: puzzleTypes.SET_LEVEL_PASSED,
        payload: levelPassed,
    }),
    setOptionsPassed: (optionsPassed) => ({
        type: puzzleTypes.SET_OPTIONS_PASSED,
        payload: optionsPassed,
    }),
    setData: (data) => ({
        type: puzzleTypes.SET_DATA,
        payload: data,
    }),
    setCurrentLine: (currentLine) => ({
        type: puzzleTypes.SET_CURRENT_LINE,
        payload: currentLine,
    }),
    setCurrentGuessedWords: (currentGuessedWords) => ({
        type: puzzleTypes.SET_CURRENT_GUESSED_WORDS,
        payload: currentGuessedWords,
    }),
    setGuessedArrays: (guessedArrays) => ({
        type: puzzleTypes.SET_GUESSED_ARRAYS,
        payload: guessedArrays,
    }),
    setCurrentShuffled: (currentShuffled) => ({
        type: puzzleTypes.SET_CURRENT_SHUFFLED,
        payload: currentShuffled,
    }),
    setCurrentOriginalArray: (currentOriginalArray) => ({
        type: puzzleTypes.SET_CURRENT_ORIGINAL_ARRAY,
        payload: currentOriginalArray,
    }),
    setSoundLink: (soundLink) => ({
        type: puzzleTypes.SET_SOUND_LINK,
        payload: soundLink,
    }),
    setDifferenceIndexes: (differenceIndexes) => ({
        type: puzzleTypes.SET_DIFFERENCE_INDEXES,
        payload: differenceIndexes,
    }),
    setGameInProgress: (gameInProgress) => ({
        type: puzzleTypes.SET_GAME_IN_PROGRESS,
        payload: gameInProgress,
    }),
    setReadyForReview: (readyForReview) => ({
        type: puzzleTypes.SET_READY_FOR_REVIEW,
        payload: readyForReview,
    }),
    setReadyForContinue: (readyForContinue) => ({
        type: puzzleTypes.SET_READY_FOR_CONTINUE,
        payload: readyForContinue,
    }),
    setTranslation: (translation) => ({
        type: puzzleTypes.SET_TRANSLATION,
        payload: translation,
    }),
    setWrongResult: (wrongResult) => ({
        type: puzzleTypes.SET_WRONG_RESULT,
        payload: wrongResult,
    }),
    setOptions: (options) => ({
        type: puzzleTypes.SET_OPTIONS,
        payload: options,
    }),
    setCorrectResultEnabledOptions: (correctResultEnabledOptions) => ({
        type: puzzleTypes.SET_CORRECT_RESULT_ENABLED,
        payload: correctResultEnabledOptions,
    }),
    setIsStartPage: (isStartPage) => ({
        type: puzzleTypes.SET_IS_START_PAGE,
        payload: isStartPage,
    }),
    setDefaultState: () => ({
        type: puzzleTypes.SET_DEFAULT_STATE,
    }),
};

export default puzzleActions;
