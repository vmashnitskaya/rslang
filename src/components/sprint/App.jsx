import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Paper } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import CancelIcon from '@material-ui/icons/Cancel';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import Timer from './Timer';
import WordContent from './WordContent';
import './styles.scss';
import useAggregatedWords from '../router/storage/hooks/useAggregatedWords';
import ResultGame from './ResultGame';
import Loading from './Loading';
import { POINT_FOR_RIGHT_ANSWER, BONUS_POINTS, MAX_STRICK } from './constants';

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export default function App({ userWordsOnly, complexity }) {
    const [page, setPage] = useState(0);
    const filterUserWordsOnly = userWordsOnly ? { userWord: { $ne: null } } : {};
    const config = {
        group: complexity,
        page,
        filter: { $or: [{ page }, { page: page + 1 }], ...filterUserWordsOnly },
        wordsPerPage: 40,
    };
    const { data, error, loading } = useAggregatedWords(config);
    const words = (data && data[0].paginatedResults) || [];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [endGame, setEndGame] = useState(false);
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);
    const [guessedWords, setGuessedWords] = useState([]);
    const [unGuessedWords, setUnGuessedWords] = useState([]);

    const gameWords = shuffle(words).map((w) => {
        const answer = Math.random() >= 0.5;
        if (answer) {
            Object.assign(w, { gameTranslate: w.wordTranslate });
        } else {
            const fileredWords = words.filter((word) => word.word !== w.word);
            const randomWord = fileredWords[Math.floor(Math.random() * fileredWords.length)];
            Object.assign(w, { gameTranslate: randomWord.wordTranslate });
        }
        return w;
    });

    const word = gameWords[currentWordIndex];

    const handleAnswer = (answer) => {
        if (
            (answer && word && word.wordTranslate === word.gameTranslate) ||
            (!answer && word && word.wordTranslate !== word.gameTranslate)
        ) {
            setScore(score + POINT_FOR_RIGHT_ANSWER);
            setStreak(streak + 1);
            if (streak >= MAX_STRICK) {
                setScore(score + BONUS_POINTS);
            }
            setGuessedWords((xs) => [...xs, word]);
        } else {
            setStreak(0);
            setUnGuessedWords((xs) => [...xs, word]);
        }
        if (currentWordIndex + 1 !== gameWords.length) {
            setCurrentWordIndex((c) => c + 1);
        } else {
            setEndGame(true);
            setIsPopUpOpened(true);
        }
    };

    const onTimeOut = useCallback(() => {
        setEndGame(true);
        setIsPopUpOpened(true);
    });
    const handlePopUpClose = useCallback(() => setIsPopUpOpened(false));
    const handleNewGame = useCallback(() => {
        setScore(0);
        setStreak(0);
        setEndGame(false);
        setGuessedWords([]);
        setCurrentWordIndex(0);
        setPage((p) => p + 2);
        setIsPopUpOpened(false);
        setUnGuessedWords([]);
    });

    const totalWinStars = Math.min(streak, MAX_STRICK);
    const totalEmptyStars = MAX_STRICK - totalWinStars;

    return (
        <Box>
            {loading && <Loading className="loader" />}
            {error && (
                <Box>
                    <Paper>Something wrong. Please try again later</Paper>
                </Box>
            )}
            {!loading && (
                <Box className="wrapper">
                    <Box className="sprint-game">
                        <Button className="closeButton" onClick={onTimeOut}>
                            <CancelIcon fontSize="large" />
                        </Button>
                        <Box className="score_container">
                            {word && !endGame && <Timer onTimeOut={onTimeOut} />}
                            <Box>
                                {Array(totalWinStars)
                                    .fill(null)
                                    .map(() => (
                                        <StarIcon key={Math.random()} className="star_full" />
                                    ))}
                                {Array(totalEmptyStars)
                                    .fill(null)
                                    .map(() => (
                                        <StarBorderOutlinedIcon
                                            key={Math.random()}
                                            className="star_empty"
                                        />
                                    ))}
                            </Box>
                            <Box className="score">{score}</Box>
                        </Box>
                        <Paper className="card" elevation={3}>
                            {word && (
                                <WordContent
                                    word={word.word}
                                    translate={word.gameTranslate}
                                    audio={word.audio}
                                />
                            )}
                            <Box className="button_container" id="box" tabIndex="0">
                                <Button
                                    onClick={() => handleAnswer(false)}
                                    className="button_wrong"
                                    variant="contained"
                                >
                                    Wrong
                                </Button>
                                <Button
                                    onClick={() => handleAnswer(true)}
                                    className="button_right"
                                    variant="contained"
                                >
                                    Right
                                </Button>
                                {isPopUpOpened && (
                                    <ResultGame
                                        open={isPopUpOpened}
                                        unGuessedWords={unGuessedWords.map(
                                            ({ word, wordTranslate, audio }) => ({
                                                word,
                                                wordTranslate,
                                                audio,
                                            })
                                        )}
                                        guessedWords={guessedWords.map(
                                            ({ word, wordTranslate, audio }) => ({
                                                word,
                                                wordTranslate,
                                                audio,
                                            })
                                        )}
                                        onClose={handlePopUpClose}
                                        onNewGame={handleNewGame}
                                    />
                                )}
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

App.propTypes = {
    userWordsOnly: PropTypes.bool.isRequired,
    complexity: PropTypes.number.isRequired,
};
