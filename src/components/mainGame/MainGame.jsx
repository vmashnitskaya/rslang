import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@material-ui/core';
import MainCard from './MainCard';
import Loading from './Loading';

import aggregatedWordsActions from '../router/storage/getAggregatedWordsRedux/aggregatedWordsActions';
import aggregatedWordsSelectors from '../router/storage/getAggregatedWordsRedux/aggregatedWordsSelectors';
import settingsActions from '../router/storage/getSettingsRedux/settingsActions';
import settingsSelectors from '../router/storage/getSettingsRedux/settingsSelectors';
import statisticsSelectors from '../router/storage/getPutStatisticsRedux/statisticsSelectors';
import mainGameActions from './redux/mainGameActions';
import mainGameSelectors from './redux/mainGameSelectors';
import { getToken, getUserId } from '../router/storage/selectors';
import statisticsActions from '../router/storage/getPutStatisticsRedux/statisticsActions';
import './MainGame.scss';

const MainGame = ({
    aggregatedWords,
    loading,
    error,
    fetchAggregatedWords,
    mainWords,
    setMainWords,
    settings,
    settingsError,
    settingsLoading,
    fetchSettings,
    userId,
    token,
    currentWordNumber,
    setCurrentWordNumber,
    increaseCurrentWordNumber,
    statistics,
    updateStatics,
}) => {
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);
    const [isNewWordWillBeShown, setIsNewWordWillBeShown] = useState(false);
    useEffect(() => {
        fetchSettings(userId, token);
    }, [fetchSettings]);

    useEffect(() => {
        setMainWords([]);
        fetchAggregatedWords(userId, token, settings.wordsPerDay + 1);
    }, [settings, fetchAggregatedWords]);

    useEffect(() => {
        setMainWords(aggregatedWords);
        setCurrentWordNumber(0);
    }, [aggregatedWords]);

    const handleNewWord = useCallback(async () => {
        console.log(currentWordNumber);
        console.log(mainWords.length);
        if (currentWordNumber >= mainWords.length - 1 && mainWords.length) {
            await fetchAggregatedWords(userId, token, settings.wordsPerDay);
        }
        if (
            statistics.optional[new Date().toISOString().slice(0, 10).replace(/-/g, '')] ===
            settings.wordsPerDay - 1
        ) {
            setIsPopUpOpened(true);
            setIsNewWordWillBeShown(true);
        } else {
            updateStatics(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
            increaseCurrentWordNumber();
        }
    }, [settings.wordsPerDay, currentWordNumber, increaseCurrentWordNumber]);

    const handleClose = () => {
        setIsPopUpOpened(false);
    };
    useEffect(() => {
        if (!isPopUpOpened && isNewWordWillBeShown) {
            updateStatics(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
            increaseCurrentWordNumber();
            setIsNewWordWillBeShown(false);
        }
    }, [isPopUpOpened, isNewWordWillBeShown]);

    return loading || error || settingsError || settingsLoading || mainWords.length === 0 ? (
        <Loading error={error} settingsError={settingsError} />
    ) : (
        <>
            <MainCard
                settings={settings}
                wordObj={mainWords.length !== 0 && mainWords[currentWordNumber]}
                newWord
                handleNewWord={handleNewWord}
                statistics={statistics}
            />
            <Dialog
                open={isPopUpOpened}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Hooray!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have achieved you goal and learned {settings.wordsPerDay} words.
                        <p className="quote">
                            &ldquo;It always seems impossible until it&apos;s done.&ldquo;
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Continue learning
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchAggregatedWords: (userId, token, wordsPerDay) => {
        dispatch(aggregatedWordsActions.fetchAggregatedWords(userId, token, wordsPerDay));
    },
    fetchSettings: (userId, token) => {
        dispatch(settingsActions.fetchSettings(userId, token));
    },
    setMainWords: (words) => {
        dispatch(mainGameActions.setMainWords(words));
    },
    setCurrentWordNumber: (number) => {
        dispatch(mainGameActions.setCurrentWordNumber(number));
    },
    increaseCurrentWordNumber: () => {
        dispatch(mainGameActions.increaseCurrentWordNumber());
    },
    updateStatics: (date) => {
        dispatch(statisticsActions.updateStatics(date));
    },
});

const mapStateToProps = (state) => ({
    aggregatedWords: aggregatedWordsSelectors.getAggregatedWords(state),
    loading: aggregatedWordsSelectors.getLoading(state),
    error: aggregatedWordsSelectors.getError(state),
    settings: settingsSelectors.getSettings(state),
    mainWords: mainGameSelectors.getMainWords(state),
    settingsError: settingsSelectors.getError(state),
    settingsLoading: settingsSelectors.getLoading(state),
    userId: getUserId(state),
    token: getToken(state),
    currentWordNumber: mainGameSelectors.getCurrentWordNumber(state),
    statistics: statisticsSelectors.getStatistics(state),
});

MainGame.propTypes = {
    aggregatedWords: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAggregatedWords: PropTypes.func.isRequired,
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
    currentWordNumber: PropTypes.number.isRequired,
    setCurrentWordNumber: PropTypes.func.isRequired,
    increaseCurrentWordNumber: PropTypes.func.isRequired,
    statistics: PropTypes.shape({
        learnedWords: PropTypes.number,
        optional: PropTypes.number,
    }).isRequired,
    updateStatics: PropTypes.func.isRequired,
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
