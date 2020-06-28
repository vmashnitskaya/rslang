import settingsTypes from './settingsTypes';

const initialState = {
    loading: false,
    error: false,
    settings: {
        wordsPerDay: 0,
        optional: {
            isShowImage: false,
            isShowTranslate: false,
            isShowTextMeaning: false,
            isShowTextExample: false,
            isShowTranscription: false,
            isShowAnswer: false,
            isShowDifficult: false,
            isShowDelete: false,
        },
    },
};

const settingsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case settingsTypes.FETCH_SETTINGS_PENDING:
            return { ...state, error: false, words: [], loading: true };
        case settingsTypes.FETCH_SETTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                settings: payload.settings,
            };
        case settingsTypes.FETCH_SETTINGS_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export default settingsReducer;
