const getPassed = (state) => state.passedWords.passed;
const getLoading = (state) => state.passedWords.loading;
const getError = (state) => state.passedWords.error;

export default {
    getPassed,
    getLoading,
    getError,
};
