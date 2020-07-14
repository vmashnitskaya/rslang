const getPagination = (state) => state.puzzle.pagination;
const getLevelPassed = (state) => state.puzzle.levelPassed;
const getOptionsPassed = (state) => state.puzzle.optionsPassed;
const getData = (state) => state.puzzle.data;
const getCurrentLine = (state) => state.puzzle.currentLine;
const getCurrentGuessedWords = (state) => state.puzzle.currentGuessedWords;
const getGuessedArrays = (state) => state.puzzle.guessedArrays;
const getCurrentShuffled = (state) => state.puzzle.currentShuffled;
const getCurrentOriginalArray = (state) => state.puzzle.currentOriginalArray;
const getSoundLink = (state) => state.puzzle.soundLink;
const getDifferenceIndexes = (state) => state.puzzle.differenceIndexes;
const getGameInProgress = (state) => state.puzzle.gameInProgress;
const getReadyForReview = (state) => state.puzzle.readyForReview;
const getReadyForContinue = (state) => state.puzzle.readyForContinue;
const getTranslation = (state) => state.puzzle.translation;
const getWrongResult = (state) => state.puzzle.wrongResult;
const getOptions = (state) => state.puzzle.options;
const getCorrectResultEnabledOptions = (state) => state.puzzle.correctResultEnabledOptions;
const getIsStartPage = (state) => state.puzzle.isStartPage;

export default {
    getPagination,
    getLevelPassed,
    getOptionsPassed,
    getData,
    getCurrentLine,
    getCurrentGuessedWords,
    getGuessedArrays,
    getCurrentShuffled,
    getCurrentOriginalArray,
    getSoundLink,
    getDifferenceIndexes,
    getGameInProgress,
    getReadyForReview,
    getReadyForContinue,
    getTranslation,
    getWrongResult,
    getOptions,
    getCorrectResultEnabledOptions,
    getIsStartPage,
};
