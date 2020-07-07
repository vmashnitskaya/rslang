const getStatistics = (state) => state.statistics.statistics;
const getLoading = (state) => state.statistics.loading;
const getError = (state) => state.statistics.error;

export default {
    getStatistics,
    getLoading,
    getError,
};
