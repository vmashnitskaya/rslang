import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { Button, FormControl, Paper, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropDown from './DropDown';
import GameBoxLine from './GameBoxLine';
import GameGuessArea from './GameGuessArea';
import Translation from './Translation';
import GameBoxLineStatic from './GameBoxLineStatic';
import Hints from './Hints';
import StartPage from './StartPage';
import Loader from './Loader';
import wordsActions from '../router/storage/getWordsRedux/wordsActions';
import wordsSelectors from '../router/storage/getWordsRedux/wordsSelectors';
import puzzleActions from './redux/puzzleActions';
import puzzleSelectors from './redux/puzzleSelectors';
import aggregatedWordsActions from '../router/storage/getAggregatedWordsRedux/aggregatedWordsActions';
import aggregatedWordsSelectors from '../router/storage/getAggregatedWordsRedux/aggregatedWordsSelectors';
import { getToken, getUserId } from '../router/storage/selectors';
import statisticsActions from '../router/storage/getPutStatisticsRedux/statisticsActions';
import ResultsPopUp from './ResultsPopUp';
import './EnglishPuzzleGame.scss';

const maxLevel = 5;
const maxOption = 59;
const minWidth = 1200;

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

let localStoragePagination = localStorage.getItem('pagination')
    ? JSON.parse(localStorage.getItem('pagination'))
    : false;

if (localStoragePagination && localStoragePagination.option < maxOption) {
    localStoragePagination.option += 1;
} else if (localStoragePagination && localStoragePagination.level < maxLevel) {
    localStoragePagination.option = 0;
    localStoragePagination.level += 1;
} else if (localStoragePagination) {
    localStoragePagination = { option: 0, level: 0 };
}

const useStyles = makeStyles((theme) => ({
    rootRadio: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '250px',
    },
    rootRadioOption: {
        display: 'none',
    },
    label: {
        color: theme.palette.primary.main,
    },
}));

const EnglishPuzzleGame = ({
    words,
    loading,
    error,
    fetchWords,
    pagination,
    data,
    currentLine,
    currentGuessedWords,
    guessedArrays,
    currentShuffled,
    currentOriginalArray,
    soundLink,
    differenceIndexes,
    gameInProgress,
    readyForReview,
    readyForContinue,
    translation,
    wrongResult,
    options,
    correctResultEnabledOptions,
    setPagination,
    setData,
    setCurrentLine,
    setCurrentGuessedWords,
    setGuessedArrays,
    setCurrentShuffled,
    setCurrentOriginalArray,
    setSoundLink,
    setDifferenceIndexes,
    setGameInProgress,
    setReadyForReview,
    setReadyForContinue,
    setTranslation,
    setWrongResult,
    setOptions,
    setCorrectResultEnabledOptions,
    setIsStartPage,
    isStartPage,
    userId,
    token,
    aggregatedWords,
    loadingAggr,
    errorAggr,
    fetchAggregatedWords,
    setDefaultState,
    setStatistics,
}) => {
    const { level, option } = pagination;
    const [wordsType, setWordsType] = useState('new');
    const classes = useStyles();
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);
    const [minWindow, setMinWindow] = useState(false);
    const container = useRef();

    const levelOptions = useMemo(
        () =>
            Array.from({ length: maxLevel + 1 }, (v, i) => ({
                value: i,
                text: (i + 1).toString(),
            })),
        []
    );
    const optionOptions = useMemo(
        () =>
            Array.from({ length: maxOption + 1 }, (v, i) => ({
                value: i,
                text: (i + 1).toString(),
            })),
        []
    );

    const handleWindowResize = useCallback(() => {
        setMinWindow(
            container.current && container.current.getBoundingClientRect().width < minWidth
        );
    }, []);

    useEffect(() => {
        setDefaultState();
        handleWindowResize();
    }, [setDefaultState, handleWindowResize]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (userId && token && wordsType === 'repeat') {
            fetchAggregatedWords(userId, token, 20, filterForRepeatWords);
        } else {
            const group = Math.floor(option / 2);
            fetchWords(group, level);
        }
    }, [wordsType, fetchAggregatedWords, fetchWords, level, option]);

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        setCurrentLine(0);
        setGuessedArrays([]);
        if (wordsType === 'repeat' && aggregatedWords.length && aggregatedWords.length > 10) {
            setData(
                aggregatedWords
                    .map(
                        ({
                            textExample,
                            audioExample,
                            textExampleTranslate,
                            wordsPerExampleSentence,
                        }) => {
                            const sentence = textExample.replace(/<\/?[^>]+(>|$)/g, '');
                            const shuffledArray = shuffle(sentence.slice(0).split(' '));
                            const originalArray = sentence.slice(0).split(' ');
                            return {
                                text: sentence,
                                pronunciation: audioExample,
                                shuffled: {
                                    array: shuffledArray,
                                    first: originalArray[0],
                                    last: originalArray[wordsPerExampleSentence - 1],
                                },
                                originalArray,
                                guessedArray: [],
                                wordsPerExampleSentence,
                                translation: textExampleTranslate,
                            };
                        }
                    )
                    .sort(() => Math.random() - 0.5)
            );
        } else if (
            wordsType === 'repeat' &&
            aggregatedWords.length &&
            aggregatedWords.length < 10
        ) {
            setWordsType('new');
        } else if (words) {
            if (words.length) {
                let currentArray = null;
                if (option % 2) {
                    currentArray = words.slice(10, 20);
                } else {
                    currentArray = words.slice(0, 10);
                }
                setData(
                    currentArray.map(
                        ({
                            textExample,
                            audioExample,
                            textExampleTranslate,
                            wordsPerExampleSentence,
                        }) => {
                            const sentence = textExample.replace(/<\/?[^>]+(>|$)/g, '');
                            const shuffledArray = shuffle(sentence.slice(0).split(' '));
                            const originalArray = sentence.slice(0).split(' ');
                            return {
                                text: sentence,
                                pronunciation: audioExample,
                                shuffled: {
                                    array: shuffledArray,
                                    first: originalArray[0],
                                    last: originalArray[wordsPerExampleSentence - 1],
                                },
                                originalArray,
                                guessedArray: [],
                                wordsPerExampleSentence,
                                translation: textExampleTranslate,
                            };
                        }
                    )
                );
            }
        }
    }, [words, aggregatedWords]);

    useEffect(() => {
        if (data.length) {
            setCurrentOriginalArray(data[currentLine].originalArray);
            setTranslation(data[currentLine].translation);
            setReadyForContinue(false);
            setReadyForReview(false);
            setCurrentGuessedWords(data[currentLine].guessedArray);
            setCurrentShuffled(data[currentLine].shuffled);
            setDifferenceIndexes(undefined);
            setSoundLink(data[currentLine].pronunciation);
            setWrongResult(false);
        }
    }, [data, currentLine]);

    const handleLevelChange = (value) => {
        setPagination({ ...pagination, level: Number(value) });
    };

    const handleOptionChange = (value) => {
        setPagination({ ...pagination, option: Number(value) });
    };

    useEffect(() => {
        if (data.length) {
            if (currentGuessedWords.length === data[currentLine].wordsPerExampleSentence) {
                setGameInProgress(false);
            } else {
                setGameInProgress(true);
            }
        }
    }, [currentGuessedWords, currentLine, data, setGameInProgress]);

    useEffect(() => {
        localStorage.setItem('optionsObject', JSON.stringify(options));
    }, [options]);

    const handleWordGuessed = (word, index) => {
        setCurrentGuessedWords([...currentGuessedWords, word]);

        const current = currentShuffled.array.slice(0);
        current.splice(index, 1);
        setCurrentShuffled({ ...currentShuffled, array: current });
    };

    const handleWordPassed = (word, index) => {
        setCurrentShuffled({ ...currentShuffled, array: [...currentShuffled.array, word] });

        const current = currentGuessedWords.slice(0);
        current.splice(index, 1);
        setCurrentGuessedWords(current);
    };

    const checkGuessingResult = () => {
        const _differenceIndexes = [];
        currentGuessedWords.forEach((word, index) => {
            if (word !== currentOriginalArray[index]) {
                _differenceIndexes.push(index);
            }
        });
        setDifferenceIndexes(_differenceIndexes);
    };

    useEffect(() => {
        if (differenceIndexes && differenceIndexes.length === 0) {
            setReadyForReview(true);
            setReadyForContinue(true);
            setWrongResult(false);
            if (options.showAnswer === false || options.autoSoundEnabled === true) {
                setCorrectResultEnabledOptions(true);
            }
        } else if (differenceIndexes && differenceIndexes.length > 0) {
            setReadyForReview(true);
            setWrongResult(true);
        }
    }, [differenceIndexes, options.showAnswer, options.soundEnabled, options.autoSoundEnabled]);

    const showAnswer = () => {
        setGameInProgress(false);
        setReadyForReview(false);
        setCurrentGuessedWords(currentOriginalArray);
        setCurrentShuffled({ ...currentShuffled, array: [] });
    };

    const startNewLevel = () => {
        setStatistics(10);
        if (option < maxOption) {
            setPagination({ ...pagination, option: pagination.option + 1 });
        } else if (level < maxLevel) {
            setPagination({ option: 0, level: pagination.level + 1 });
        } else {
            setPagination({ level: 0, option: 0 });
        }
    };

    const handleContinueGame = () => {
        setIsPopUpOpened(false);
        startNewLevel();
    };

    useEffect(() => {
        setCorrectResultEnabledOptions(false);
    }, [level, option]);

    const continueGame = () => {
        if (currentLine < 9) {
            setCurrentGuessedWords([]);
            setCorrectResultEnabledOptions(false);
            setGuessedArrays([...guessedArrays, currentGuessedWords]);
            const current = currentLine;
            setCurrentLine(current + 1);
        } else {
            setIsPopUpOpened(true);
        }
    };

    const enableAutoPronunciation = () => {
        setOptions({
            ...options,
            autoSoundEnabled: !options.autoSoundEnabled,
        });
    };

    const enablePronunciation = () => {
        setOptions({ ...options, soundEnabled: !options.soundEnabled });
    };

    const enableTranslation = () => {
        setOptions({
            ...options,
            translationShown: !options.translationShown,
        });
    };

    const handleStartPageClose = () => {
        setIsStartPage(!isStartPage);
    };

    const handleRadioChange = (event) => {
        if (wordsType && wordsType !== event.target.value) {
            setWordsType(event.target.value);
            setIsDropdownDisabled(!isDropdownDisabled);
        }
    };

    const onPopupClosed = () => {
        setIsPopUpOpened(false);
    };

    return isStartPage ? (
        <div ref={container}>
            <StartPage onClick={handleStartPageClose} minWindow={minWindow} />
        </div>
    ) : (
        <>
            <div className="ep-page">
                <div className="header">
                    <div className="header__drop-downs">
                        <DropDown
                            className="level"
                            name="level"
                            label="Level"
                            value={level}
                            options={levelOptions}
                            onChange={handleLevelChange}
                            isDropdownDisabled={isDropdownDisabled}
                        />
                        <DropDown
                            className="page"
                            name="page"
                            label="Page"
                            value={option}
                            options={optionOptions}
                            onChange={handleOptionChange}
                            isDropdownDisabled={isDropdownDisabled}
                        />
                    </div>
                    {token && userId && (
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="words"
                                name="words"
                                value={wordsType}
                                onChange={handleRadioChange}
                                className={classes.rootRadio}
                            >
                                <FormControlLabel
                                    value="new"
                                    control={<Radio className={classes.rootRadioOption} />}
                                    label="New"
                                    labelPlacement="top"
                                    className={wordsType === 'new' && classes.label}
                                />
                                <FormControlLabel
                                    value="repeat"
                                    control={<Radio className={classes.rootRadioOption} />}
                                    label="Repeat words"
                                    labelPlacement="top"
                                    className={wordsType === 'repeat' && classes.label}
                                />
                            </RadioGroup>
                        </FormControl>
                    )}
                    <Hints
                        handleAutoEnabledChecked={enableAutoPronunciation}
                        handlePronunciationHintChecked={enablePronunciation}
                        handleTranslationHintChecked={enableTranslation}
                        options={options}
                    />
                </div>

                {loading || error || loadingAggr || errorAggr || data.length === 0 ? (
                    <Loader error={error} errorAggr={errorAggr} />
                ) : (
                    <div className="main game">
                        <Translation
                            text={translation}
                            audio={soundLink}
                            options={options}
                            correctResultEnabledOptions={correctResultEnabledOptions}
                        />
                        <>
                            <Paper className="game__box">
                                {guessedArrays.map((array, index) => (
                                    <GameBoxLineStatic
                                        key={`array${index + 1}`}
                                        guessedArray={array}
                                        length={array.length}
                                    />
                                ))}
                                {guessedArrays.length !== 10 && (
                                    <GameBoxLine
                                        guessedArray={currentGuessedWords}
                                        length={data[currentLine].wordsPerExampleSentence}
                                        firstWord={currentOriginalArray[0]}
                                        lastWord={
                                            currentOriginalArray[currentOriginalArray.length - 1]
                                        }
                                        onWordClick={handleWordPassed}
                                        readyForReview={readyForReview}
                                        differenceIndexes={differenceIndexes}
                                    />
                                )}
                            </Paper>
                            <div className="game__guess-area">
                                <GameGuessArea
                                    shuffled={currentShuffled}
                                    length={data[currentLine].wordsPerExampleSentence}
                                    onClick={handleWordGuessed}
                                />
                            </div>
                        </>
                        <div className="game__buttons">
                            {(wrongResult || (gameInProgress && !readyForContinue)) && (
                                <Button
                                    className="not-know"
                                    variant="contained"
                                    color="primary"
                                    onClick={showAnswer}
                                >
                                    I don&apos;t know
                                </Button>
                            )}
                            {(wrongResult || (!gameInProgress && !readyForContinue)) && (
                                <Button
                                    className="check"
                                    variant="contained"
                                    color="primary"
                                    onClick={checkGuessingResult}
                                >
                                    Check
                                </Button>
                            )}
                            {!wrongResult && !gameInProgress && readyForContinue && (
                                <Button
                                    className="continue"
                                    variant="contained"
                                    color="primary"
                                    onClick={continueGame}
                                >
                                    Continue
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <ResultsPopUp
                open={isPopUpOpened}
                data={data}
                onClose={onPopupClosed}
                onNewGame={handleContinueGame}
            />
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchWords: (page, group) => {
        dispatch(wordsActions.fetchWords(page, group));
    },
    setPagination: (pagination) => {
        dispatch(puzzleActions.setPagination(pagination));
    },
    setGuessedWords: (guessedWords) => {
        dispatch(puzzleActions.setGuessedWords(guessedWords));
    },
    setData: (data) => {
        dispatch(puzzleActions.setData(data));
    },
    setCurrentLine: (currentLine) => {
        dispatch(puzzleActions.setCurrentLine(currentLine));
    },
    setCurrentGuessedWords: (currentGuessedWords) => {
        dispatch(puzzleActions.setCurrentGuessedWords(currentGuessedWords));
    },
    setGuessedArrays: (guessedArrays) => {
        dispatch(puzzleActions.setGuessedArrays(guessedArrays));
    },
    setCurrentShuffled: (currentShuffled) => {
        dispatch(puzzleActions.setCurrentShuffled(currentShuffled));
    },
    setCurrentOriginalArray: (currentOriginalArray) => {
        dispatch(puzzleActions.setCurrentOriginalArray(currentOriginalArray));
    },
    setSoundLink: (soundLink) => {
        dispatch(puzzleActions.setSoundLink(soundLink));
    },
    setDifferenceIndexes: (differenceIndexes) => {
        dispatch(puzzleActions.setDifferenceIndexes(differenceIndexes));
    },
    setGameInProgress: (gameInProgress) => {
        dispatch(puzzleActions.setGameInProgress(gameInProgress));
    },
    setReadyForReview: (readyForReview) => {
        dispatch(puzzleActions.setReadyForReview(readyForReview));
    },
    setReadyForContinue: (readyForContinue) => {
        dispatch(puzzleActions.setReadyForContinue(readyForContinue));
    },
    setTranslation: (translation) => {
        dispatch(puzzleActions.setTranslation(translation));
    },
    setWrongResult: (wrongResult) => {
        dispatch(puzzleActions.setWrongResult(wrongResult));
    },
    setOptions: (options) => {
        dispatch(puzzleActions.setOptions(options));
    },
    setCorrectResultEnabledOptions: (correctResultEnabledOptions) => {
        dispatch(puzzleActions.setCorrectResultEnabledOptions(correctResultEnabledOptions));
    },
    setIsStartPage: (isStartPage) => {
        dispatch(puzzleActions.setIsStartPage(isStartPage));
    },
    fetchAggregatedWords: (userId, token, wordsPerDay, filter) => {
        dispatch(aggregatedWordsActions.fetchAggregatedWords(userId, token, wordsPerDay, filter));
    },
    setDefaultState: () => {
        dispatch(puzzleActions.setDefaultState());
    },
    setStatistics: (correct) =>
        dispatch(statisticsActions.updateStaticsMiniGame('puzzle', 10, correct)),
});

const mapStateToProps = (state) => ({
    words: wordsSelectors.getWords(state),
    loading: wordsSelectors.getLoading(state),
    error: wordsSelectors.getError(state),
    pagination: puzzleSelectors.getPagination(state),
    levelPassed: puzzleSelectors.getLevelPassed(state),
    data: puzzleSelectors.getData(state),
    currentLine: puzzleSelectors.getCurrentLine(state),
    currentGuessedWords: puzzleSelectors.getCurrentGuessedWords(state),
    guessedArrays: puzzleSelectors.getGuessedArrays(state),
    currentShuffled: puzzleSelectors.getCurrentShuffled(state),
    currentOriginalArray: puzzleSelectors.getCurrentOriginalArray(state),
    soundLink: puzzleSelectors.getSoundLink(state),
    differenceIndexes: puzzleSelectors.getDifferenceIndexes(state),
    gameInProgress: puzzleSelectors.getGameInProgress(state),
    readyForReview: puzzleSelectors.getReadyForReview(state),
    readyForContinue: puzzleSelectors.getReadyForContinue(state),
    translation: puzzleSelectors.getTranslation(state),
    wrongResult: puzzleSelectors.getWrongResult(state),
    options: puzzleSelectors.getOptions(state),
    correctResultEnabledOptions: puzzleSelectors.getCorrectResultEnabledOptions(state),
    isStartPage: puzzleSelectors.getIsStartPage(state),
    userId: getUserId(state),
    token: getToken(state),
    aggregatedWords: aggregatedWordsSelectors.getAggregatedWords(state),
    loadingAggr: aggregatedWordsSelectors.getLoading(state),
    errorAggr: aggregatedWordsSelectors.getError(state),
});

EnglishPuzzleGame.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    fetchWords: PropTypes.func.isRequired,

    pagination: PropTypes.shape({
        level: PropTypes.number,
        option: PropTypes.number,
    }).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            pronunciation: PropTypes.string,
            shuffled: PropTypes.shape({
                array: PropTypes.arrayOf(PropTypes.string),
                first: PropTypes.string,
                last: PropTypes.string,
            }),
            originalArray: PropTypes.arrayOf(PropTypes.string),
            guessedArray: PropTypes.arrayOf(PropTypes.string),
            wordsPerExampleSentence: PropTypes.number,
            translation: PropTypes.string,
        })
    ),
    currentLine: PropTypes.number,
    currentGuessedWords: PropTypes.arrayOf(PropTypes.string),
    guessedArrays: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    currentShuffled: PropTypes.shape({
        array: PropTypes.arrayOf(PropTypes.string),
        first: PropTypes.string,
        last: PropTypes.string,
    }),
    currentOriginalArray: PropTypes.arrayOf(PropTypes.string),
    soundLink: PropTypes.string,
    differenceIndexes: PropTypes.arrayOf(PropTypes.number),
    gameInProgress: PropTypes.bool.isRequired,
    readyForReview: PropTypes.bool.isRequired,
    readyForContinue: PropTypes.bool.isRequired,
    translation: PropTypes.string,
    wrongResult: PropTypes.bool.isRequired,
    options: PropTypes.objectOf(PropTypes.bool).isRequired,
    correctResultEnabledOptions: PropTypes.bool.isRequired,
    setPagination: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    setCurrentLine: PropTypes.func.isRequired,
    setCurrentGuessedWords: PropTypes.func.isRequired,
    setGuessedArrays: PropTypes.func.isRequired,
    setCurrentShuffled: PropTypes.func.isRequired,
    setCurrentOriginalArray: PropTypes.func.isRequired,
    setSoundLink: PropTypes.func.isRequired,
    setDifferenceIndexes: PropTypes.func.isRequired,
    setGameInProgress: PropTypes.func.isRequired,
    setReadyForReview: PropTypes.func.isRequired,
    setReadyForContinue: PropTypes.func.isRequired,
    setTranslation: PropTypes.func.isRequired,
    setWrongResult: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    setCorrectResultEnabledOptions: PropTypes.func.isRequired,
    setIsStartPage: PropTypes.func.isRequired,
    isStartPage: PropTypes.bool.isRequired,
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
    loadingAggr: PropTypes.bool.isRequired,
    errorAggr: PropTypes.bool,
    fetchAggregatedWords: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    setDefaultState: PropTypes.func.isRequired,
    setStatistics: PropTypes.func.isRequired,
};

EnglishPuzzleGame.defaultProps = {
    error: false,
    data: [],
    currentLine: 0,
    currentGuessedWords: [],
    guessedArrays: [],
    currentShuffled: { array: [] },
    currentOriginalArray: [],
    soundLink: '',
    differenceIndexes: undefined,
    translation: '',
    errorAggr: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnglishPuzzleGame);
