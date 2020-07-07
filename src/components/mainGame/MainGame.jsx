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
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core';
import MainCard from './MainCard';
import Loading from './Loading';
import Alert from './Alert';
import aggregatedWordsActions from '../router/storage/getAggregatedWordsRedux/aggregatedWordsActions';
import aggregatedWordsSelectors from '../router/storage/getAggregatedWordsRedux/aggregatedWordsSelectors';
import statisticsSelectors from '../router/storage/getPutStatisticsRedux/statisticsSelectors';
import mainGameActions from './redux/mainGameActions';
import mainGameSelectors from './redux/mainGameSelectors';
import { getToken, getUserId } from '../router/storage/selectors';
import settingsSelectors from '../router/storage/getSettingsRedux/settingsSelectors';
import statisticsActions from '../router/storage/getPutStatisticsRedux/statisticsActions';
import './MainGame.scss';

const filterForNewAndLearnedWords = {
    $or: [
        {
            $and: [
                {
                    'userWord.optional.difficult': true,
                    'userWord.optional.deleted': null,
                },
            ],
        },
        { userWord: null },
        {
            $and: [
                {
                    'userWord.optional.repeat': true,
                    'userWord.optional.deleted': null,
                },
            ],
        },
    ],
};

const filterForNewWords = {
    userWord: null,
};

const filterForRepeatWords = {
    $or: [
        {
            $and: [
                {
                    'userWord.optional.difficult': true,
                    'userWord.optional.deleted': null,
                },
            ],
        },
        {
            $and: [
                {
                    'userWord.optional.repeat': true,
                    'userWord.optional.deleted': null,
                },
            ],
        },
        {
            $and: [
                {
                    'userWord.optional.learned': true,
                    'userWord.optional.deleted': null,
                },
            ],
        },
    ],
};

const MainGame = ({
    aggregatedWords,
    loading,
    error,
    fetchAggregatedWords,
    mainWords,
    setMainWords,
    userId,
    token,
    currentWordNumber,
    setCurrentWordNumber,
    increaseCurrentWordNumber,
    statistics,
    updateStatics,
    settings,
}) => {
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);
    const [isNewWordWillBeShown, setIsNewWordWillBeShown] = useState(false);
    const [wordsType, setWordsType] = useState('new');
    const [alertShown, setAlertShown] = useState(false);
    const [successAndErrors, setSuccessAndErrors] = useState([]);
    const [countOfNewWords, setCountOfNewWords] = useState(0);

    useEffect(() => {
        if (settings.optional && wordsType && wordsType === 'new') {
            fetchAggregatedWords(userId, token, settings.wordsPerDay + 1, filterForNewWords);
        } else if (settings.optional && wordsType && wordsType === 'mixed') {
            fetchAggregatedWords(
                userId,
                token,
                settings.wordsPerDay + 1,
                filterForNewAndLearnedWords
            );
        } else if (settings.optional && wordsType && wordsType === 'repeat') {
            fetchAggregatedWords(userId, token, settings.wordsPerDay + 1, filterForRepeatWords);
        }
    }, [wordsType, settings]);

    useEffect(() => {
        if (aggregatedWords === null) {
            setWordsType('new');
            setAlertShown(true);
        } else {
            setMainWords(aggregatedWords);
            setCurrentWordNumber(0);
        }
    }, [aggregatedWords]);

    const handleNewWord = useCallback(async () => {
        if (currentWordNumber >= mainWords.length - 1 && mainWords.length) {
            if (wordsType === 'new') {
                await fetchAggregatedWords(
                    userId,
                    token,
                    settings.wordsPerDay + 1,
                    filterForNewWords
                );
            } else if (wordsType === 'mixed') {
                await fetchAggregatedWords(
                    userId,
                    token,
                    settings.wordsPerDay + 1,
                    filterForNewAndLearnedWords
                );
            } else if (wordsType === 'repeat') {
                await fetchAggregatedWords(
                    userId,
                    token,
                    settings.wordsPerDay + 1,
                    filterForRepeatWords
                );
            }
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

    const handleWordsTypeChanged = (type) => {
        if (wordsType !== type && type === 'new') {
            setWordsType('new');
        } else if (wordsType !== type && type === 'mixed') {
            setWordsType('mixed');
        } else if (wordsType !== type && type === 'repeat') {
            setWordsType('repeat');
        }
    };

    const handleAlertClose = () => {
        setAlertShown(false);
    };

    const handleSuccessAndErrors = (result) => {
        if (successAndErrors.length === currentWordNumber) {
            setSuccessAndErrors((prevState) => [...prevState, result]);
        }
    };

    const handleCountNewWords = () => {
        setCountOfNewWords(countOfNewWords + 1);
    };

    const handleMostSuccesfullSequence = () => {
        let result = 1;
        let count = 0;
        successAndErrors.slice(successAndErrors.indexOf('correct')).forEach((element, index) => {
            if (element === successAndErrors[index + 1]) {
                count += 1;
            } else {
                if (result < count) {
                    result = count;
                }
                count = 0;
            }
        });
        return result;
    };

    return loading || error || mainWords.length === 0 ? (
        <Loading error={error} settingsError={false} />
    ) : (
        <>
            <MainCard
                settings={settings}
                wordObj={mainWords.length !== 0 && mainWords[currentWordNumber]}
                handleNewWord={handleNewWord}
                statistics={statistics}
                currentWordNumber={currentWordNumber}
                handleWordsTypeChanged={handleWordsTypeChanged}
                wordsType={wordsType}
                handleSuccessAndErrors={handleSuccessAndErrors}
                handleCountNewWords={handleCountNewWords}
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
                        You have achieved you goal.
                        <span className="quote">
                            &ldquo;It always seems impossible until it&apos;s done.&ldquo;
                        </span>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">Amount of learned words</TableCell>
                                    <TableCell align="center">{settings.wordsPerDay}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Percentage of sucessfull answers
                                    </TableCell>
                                    <TableCell align="center">
                                        {(successAndErrors.filter(
                                            (element) => element === 'correct'
                                        ).length *
                                            100) /
                                            settings.wordsPerDay}{' '}
                                        %
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Amount of new words</TableCell>
                                    <TableCell align="center">{countOfNewWords}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Most successfull sequence</TableCell>
                                    <TableCell align="center">
                                        {handleMostSuccesfullSequence()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Continue learning
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={Boolean(alertShown)}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                color="primary"
            >
                <Alert onClose={handleAlertClose}>
                    {alertShown && "No words to repeat. Let's continue with new ones."}
                </Alert>
            </Snackbar>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchAggregatedWords: (userId, token, wordsPerDay, filter) => {
        dispatch(aggregatedWordsActions.fetchAggregatedWords(userId, token, wordsPerDay, filter));
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
    mainWords: mainGameSelectors.getMainWords(state),
    userId: getUserId(state),
    token: getToken(state),
    settings: settingsSelectors.getSettings(state),
    currentWordNumber: mainGameSelectors.getCurrentWordNumber(state),
    statistics: statisticsSelectors.getStatistics(state),
});

MainGame.propTypes = {
    aggregatedWords: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            word: PropTypes.string,
            audio: PropTypes.string,
            image: PropTypes.string,
            transcription: PropTypes.string,
            wordTranslate: PropTypes.string,
            userWord: PropTypes.shape({
                difficulty: PropTypes.string,
                optional: PropTypes.shape({
                    learned: PropTypes.bool,
                    difficult: PropTypes.bool,
                    deleted: PropTypes.bool,
                    repeat: PropTypes.bool,
                }),
            }),
        })
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
    }).isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
