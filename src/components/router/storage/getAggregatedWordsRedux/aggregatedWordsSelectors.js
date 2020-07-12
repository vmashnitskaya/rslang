const getAggregatedWords = (state) => state.aggregatedWords.aggregatedWords;
const getLoading = (state) => state.aggregatedWords.loading;
const getError = (state) => state.aggregatedWords.error;
const getWordsCount = (state) =>
    state.aggregatedWords.aggregatedWords ? state.aggregatedWords.aggregatedWords.length : 0;

export default {
    getAggregatedWords,
    getWordsCount,
    getLoading,
    getError,
};
