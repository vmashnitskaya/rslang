const getPage = (state) => state.words.page;
const getGroup = (state) => state.words.group;
const getWords = (state) => state.words.words;
const getLoading = (state) => state.words.loading;
const getError = (state) => state.words.error;

export default {
    getPage,
    getGroup,
    getWords,
    getLoading,
    getError,
};
