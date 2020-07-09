const getSettings = (state) => state.settings.settings;
const getLoading = (state) => state.settings.loading;
const getError = (state) => state.settings.error;

export default {
    getSettings,
    getLoading,
    getError,
};
