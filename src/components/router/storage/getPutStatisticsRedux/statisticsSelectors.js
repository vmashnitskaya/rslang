import utils from './statisticsUtils';

const getStatistics = (state) => state.statistics.statistics;
const getTodayMainGameStatistics = (state) => {
    const stats = getStatistics(state).optional;
    const date = utils.getDate();
    return stats.main && stats.main[date] ? stats.main[date] : utils.getInitialDateStaticstics(20);
};
const getLoading = (state) => state.statistics.loading;
const getError = (state) => state.statistics.error;

export default {
    getStatistics,
    getLoading,
    getError,
    getTodayMainGameStatistics,
};
