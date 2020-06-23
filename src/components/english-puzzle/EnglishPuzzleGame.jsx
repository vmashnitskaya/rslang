import React, { useMemo, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import api from './api';
import DropDown from './DropDown';
import GameBoxLine from './GameBoxLine';
import GameGuessArea from './GameGuessArea';
import Translation from './Translation';
import GameBoxLineStatic from './GameBoxLineStatic';
import Hints from './Hints';
import Loader from './Loader';
import StartPage from './StartPage';
import './EnglishPuzzleGame.scss';

const maxLevel = 5;
const maxOption = 59;
const optionsPassedObject = Array.from({ length: maxLevel + 1 }, (_, i) => i).reduce(
    (acc, el) => ({ ...acc, [el]: [] }),
    {}
);
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

const EnglishPuzzleGame = () => {
    const [{ level, option }, setPagination] = useState(
        localStoragePagination || { level: 0, option: 0 }
    );
    const [levelPassed, setLevelPassed] = useState(
        localStorage.getItem('levelPassed') ? JSON.parse(localStorage.getItem('levelPassed')) : []
    );
    const [optionsPassed, setOptionsPassed] = useState(
        localStorage.getItem('optionsPassed')
            ? JSON.parse(localStorage.getItem('optionsPassed'))
            : optionsPassedObject
    );

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentGuessedWords, setCurrentGuessedWords] = useState([]);
    const [guessedArrays, setGuessedArrays] = useState([]);
    const [currentShuffled, setCurrentShuffled] = useState({});
    const [currentOriginalArray, setCurrentOriginalArray] = useState([]);
    const [soundLink, setSoundLink] = useState('');
    const [isGameStarted, setIsGameStarted] = useState(false);

    const [differenceIndexes, setDifferenceIndexes] = useState(undefined);

    const [gameInProgress, setGameInProgress] = useState(true);
    const [readyForReview, setReadyForReview] = useState(false);
    const [readyForContinue, setReadyForContinue] = useState(false);

    const [translation, setTranslation] = useState('');

    const [wrongResult, setWrongResult] = useState(false);

    const [options, setOptions] = useState(
        localStorage.getItem('optionsObject')
            ? JSON.parse(localStorage.getItem('optionsObject'))
            : {
                  translationShown: true,
                  soundEnabled: true,
                  autoSoundEnabled: true,
              }
    );
    const [correctResultEnabledOptions, setCorrectResultEnabledOptions] = useState(false);

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

    const handleLevelChange = (value) => {
        setPagination((prevState) => ({ ...prevState, level: Number(value) }));
    };

    const handleOptionChange = (value) => {
        setPagination((prevState) => ({ ...prevState, option: Number(value) }));
    };

    useEffect(() => {
        setLoading(true);
        setCurrentLine(0);
        setGuessedArrays([]);
        api.getSentences(level, option)
            .then(setData)
            .then(() => setLoading(false));
        localStorage.setItem('pagination', JSON.stringify({ level, option }));
    }, [level, option]);

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

    useEffect(() => {
        if (data.length) {
            if (currentGuessedWords.length === data[currentLine].sentenceLength) {
                setGameInProgress(false);
            } else {
                setGameInProgress(true);
            }
        }
    }, [currentGuessedWords, currentLine, data]);

    useEffect(() => {
        localStorage.setItem('optionsObject', JSON.stringify(options));
    }, [options]);

    const handleWordGuessed = (word, index) => {
        setCurrentGuessedWords((prevState) => [...prevState, word]);
        setCurrentShuffled((prevState) => {
            const array = [...prevState.array];
            array.splice(index, 1);
            return { ...prevState, array };
        });
    };

    const handleWordPassed = (word, index) => {
        setCurrentShuffled((prevState) => ({ ...prevState, array: [...prevState.array, word] }));
        setCurrentGuessedWords((prevState) => {
            const state = [...prevState];
            state.splice(index, 1);
            return state;
        });
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
            if (
                options.showAnswer === false ||
                options.soundEnabled === false ||
                optionOptions.autoSoundEnabled === false
            ) {
                setCorrectResultEnabledOptions(true);
            }
        } else if (differenceIndexes && differenceIndexes.length > 0) {
            setReadyForReview(true);
            setWrongResult(true);
        }
    }, [
        differenceIndexes,
        options.showAnswer,
        options.soundEnabled,
        optionOptions.autoSoundEnabled,
    ]);

    const showAnswer = () => {
        setGameInProgress(false);
        setReadyForReview(false);
        setCurrentGuessedWords(currentOriginalArray);
        setCurrentShuffled((prevState) => {
            return { ...prevState, array: [] };
        });
    };

    const startNewLevel = () => {
        if (option < maxOption) {
            setOptionsPassed((prevState) => ({
                ...prevState,
                [level]: [...prevState[level], option],
            }));
            setPagination((prevState) => ({ ...prevState, option: prevState.option + 1 }));
        } else if (level < maxLevel) {
            if (optionsPassed[level].length === maxOption) {
                setOptionsPassed((prevState) => ({
                    ...prevState,
                    [level]: [...prevState[level], maxOption],
                }));
                setLevelPassed((prevState) => [...prevState, level]);
            } else {
                setOptionsPassed((prevState) => ({
                    ...prevState,
                    [level]: [...prevState[level], maxOption],
                }));
            }

            setPagination((prevState) => ({ option: 0, level: prevState.level + 1 }));
        } else {
            setPagination({ level: 0, option: 0 });
        }
    };

    useEffect(() => {
        setCorrectResultEnabledOptions(false);
    }, [level, option]);

    useEffect(() => {
        localStorage.setItem('optionsPassed', JSON.stringify(optionsPassed));
        localStorage.setItem('levelPassed', JSON.stringify(levelPassed));
    }, [optionsPassed, levelPassed]);

    const continueGame = () => {
        if (currentLine < 9) {
            setCurrentGuessedWords([]);
            setCorrectResultEnabledOptions(false);
            setGuessedArrays((prevState) => [...prevState, currentGuessedWords]);
            setCurrentLine((prevState) => prevState + 1);
        } else {
            startNewLevel();
        }
    };

    const enableAutoPronunciation = () => {
        setOptions((prevState) => ({
            ...prevState,
            autoSoundEnabled: !prevState.autoSoundEnabled,
        }));
    };

    const enablePronunciation = () => {
        setOptions((prevState) => ({ ...prevState, soundEnabled: !prevState.soundEnabled }));
    };

    const enableTranslation = () => {
        setOptions((prevState) => ({
            ...prevState,
            translationShown: !prevState.translationShown,
        }));
    };

    const handleGameStarted = () => {
        setIsGameStarted(!isGameStarted);
    };

    return !isGameStarted ? (
        <StartPage onClick={handleGameStarted} />
    ) : (
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
                        level={level}
                        passed={levelPassed}
                    />
                    <DropDown
                        className="page"
                        name="page"
                        label="Page"
                        value={option}
                        options={optionOptions}
                        onChange={handleOptionChange}
                        level={level}
                        passed={optionsPassed}
                    />
                </div>
                <Hints
                    handleAutoEnabledChecked={enableAutoPronunciation}
                    handlePronunciationHintChecked={enablePronunciation}
                    handleTranslationHintChecked={enableTranslation}
                    options={options}
                />
            </div>
            <div className="main game">
                <Translation
                    text={translation}
                    audio={soundLink}
                    options={options}
                    correctResultEnabledOptions={correctResultEnabledOptions}
                />
                {loading ? (
                    <Loader />
                ) : (
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
                                    length={data[currentLine].sentenceLength}
                                    firstWord={currentOriginalArray[0]}
                                    lastWord={currentOriginalArray[currentOriginalArray.length - 1]}
                                    onWordClick={handleWordPassed}
                                    readyForReview={readyForReview}
                                    differenceIndexes={differenceIndexes}
                                />
                            )}
                        </Paper>
                        <div className="game__guess-area">
                            <GameGuessArea
                                shuffled={currentShuffled}
                                length={data[currentLine].sentenceLength}
                                onClick={handleWordGuessed}
                            />
                        </div>
                    </>
                )}
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
        </div>
    );
};

export default EnglishPuzzleGame;
