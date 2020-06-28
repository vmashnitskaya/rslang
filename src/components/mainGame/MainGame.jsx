import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainCard from './MainCard';
import Loading from './Loading';
import wordsActions from '../router/storage/getWordsRedux/wordsActions';
import wordsSelectors from '../router/storage/getWordsRedux/wordsSelectors';
import settingsActions from '../router/storage/getSettingsRedux/settingsActions';
import settingsSelectors from '../router/storage/getSettingsRedux/settingsSelectors';
import mainGameActions from './redux/mainGameActions';
import mainGameSelectors from './redux/mainGameSelectors';
import { getToken, getUserId } from '../router/storage/selectors';
import './MainGame.scss';

const MainGame = ({
    words,
    loading,
    error,
    fetchWords,
    mainWords,
    setMainWords,
    settings,
    settingsError,
    settingsLoading,
    fetchSettings,
    userId,
    token,
}) => {
    useEffect(() => {
        fetchSettings(userId, token);
    }, [fetchSettings]);

    useEffect(() => {
        fetchWords(0, 0);
    }, [settings, fetchWords]);

    useEffect(() => {
        setMainWords(words);
    }, [words]);

    return loading || error || settingsError || settingsLoading || mainWords.length === 0 ? (
        <Loading error={error} settingsError={settingsError} />
    ) : (
        <MainCard settings={settings} wordObj={mainWords.length ? mainWords[0] : []} />
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchWords: (page, group) => {
        dispatch(wordsActions.fetchWords(page, group));
    },
    fetchSettings: (userId, token) => {
        dispatch(settingsActions.fetchSettings(userId, token));
    },
    setMainWords: (words) => {
        dispatch(mainGameActions.setMainWords(words));
    },
});

const mapStateToProps = (state) => ({
    words: wordsSelectors.getWords(state),
    loading: wordsSelectors.getLoading(state),
    error: wordsSelectors.getError(state),
    settings: settingsSelectors.getSettings(state),
    mainWords: mainGameSelectors.getMainWords(state),
    settingsError: settingsSelectors.getError(state),
    settingsLoading: settingsSelectors.getLoading(state),
    userId: getUserId(state),
    token: getToken(state),
});

MainGame.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchWords: PropTypes.func.isRequired,
    mainWords: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            word: PropTypes.string,
            audio: PropTypes.string,
            image: PropTypes.string,
            transcription: PropTypes.string,
            wordTranslate: PropTypes.string,
        })
    ),
    setMainWords: PropTypes.func.isRequired,
    settings: PropTypes.shape({
        wordsPerDay: PropTypes.number,
        optional: PropTypes.objectOf(PropTypes.bool),
    }),
    settingsError: PropTypes.string.isRequired,
    settingsLoading: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    fetchSettings: PropTypes.func.isRequired,
};

MainGame.defaultProps = {
    mainWords: [],
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

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
