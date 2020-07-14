const getSettings = (state) => state.settings.settings;
const getWordsPerDay = (state) =>
    state.settings.settings ? state.settings.settings.wordsPerDay : 20;
const getLoading = (state) => state.settings.loading;
const getError = (state) => state.settings.error;

export default {
    getSettings,
    getLoading,
    getError,
    getWordsPerDay,
};
