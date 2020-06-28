import settingsTypes from './settingsTypes';
import settingsApi from './settingsApi';

const fetchSettingsPending = () => ({
    type: settingsTypes.FETCH_SETTINGS_PENDING,
});

const fetchSettingsSuccess = (userId, token, settings) => ({
    type: settingsTypes.FETCH_SETTINGS_SUCCESS,
    payload: { userId, token, settings },
});

const fetchSettingsFailed = (error) => ({
    type: settingsTypes.FETCH_SETTINGS_FAILED,
    payload: error,
});

const fetchSettings = (userId, token) => async (dispatch) => {
    try {
        dispatch(fetchSettingsPending());
        const settings = await settingsApi.getUserSettings(userId, token);
        dispatch(fetchSettingsSuccess(userId, token, settings));
    } catch (e) {
        dispatch(fetchSettingsFailed(e.message));
    }
};

export default { fetchSettings };
