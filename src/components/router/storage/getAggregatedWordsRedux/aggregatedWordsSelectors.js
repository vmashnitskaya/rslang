const getAggregatedWords = (state) => state.aggregatedWords.aggregatedWords;
const getLoading = (state) => state.aggregatedWords.loading;
const getError = (state) => state.aggregatedWords.error;

export default {
    getAggregatedWords,
    getLoading,
    getError,
};
