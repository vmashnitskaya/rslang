import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../storage/actions';
import selectors from '../storage/selectors';
import utils from '../utils';
import WordToGuess from './WordToGuess';
import Answers from './Answers';
import Crystal from './Crystal';
import Timer from './Timer';
import GameHeader from './GameHeader';

function GamePage({ words, setFinished, setGameResults, rightAnswersCallback }) {
    const [ready, setReady] = useState(false);
    const [round, setRound] = useState(0);

    const [roundFinished, setRoundFinished] = useState(true);
    const [roundResult, setRoundResult] = useState(null);
    const [awaitingResults, setAwaitingResults] = useState(null);
    const [gameFinished, setGameFinished] = useState(false);
    const [lives, setLives] = useState(new Array(5).fill(true));
    const [rightAnswers, setrightAnswers] = useState(0);
    const [tempResults, setTempResults] = useState([]);
    const roundTimeout = React.useRef();
    const piuuTimeout = React.useRef();

    const mapWordToResults = (ind, correct) => {
        return {
            id: words[ind].id,
            word: words[ind].word,
            wordTranslate: words[ind].wordTranslate,
            audio: words[ind].audio,
            correct,
        };
    };

    const finishRound = (correct) => {
        clearTimeout(roundTimeout.current);
        setTempResults((prev) =>
            prev.find((e) => e.id === words[round].id)
                ? prev
                : [...prev, mapWordToResults(round, correct)]
        );
        if (!correct) {
            setLives((prev) => {
                const newLivesArr = prev.slice();
                const index = prev.indexOf(true);
                if (index >= 0) {
                    newLivesArr[index] = false;
                }
                return newLivesArr;
            });
        }
        setRoundResult(correct);
        setAwaitingResults(true);
        piuuTimeout.current = setTimeout(() => setAwaitingResults(false), 2000);
    };

    useEffect(() => {
        if (awaitingResults === false) {
            setRoundResult(null);
            if (round >= words.length - 1 || lives.indexOf(true) < 0) {
                setGameFinished(true);
            } else {
                setRound((prev) => prev + 1);
                setRoundFinished(true);
            }
        }
    }, [awaitingResults]);

    useEffect(() => {
        if (ready && roundFinished) {
            clearTimeout(roundTimeout.current);
            roundTimeout.current = setTimeout(() => finishRound(false), 5000);
            setRoundFinished(false);
        }
    }, [ready, roundFinished]);

    useEffect(() => {
        if (gameFinished) {
            clearTimeout(roundTimeout.current);
            clearTimeout(piuuTimeout.current);
            const results = [
                ...tempResults,
                ...words
                    .slice(tempResults.length)
                    .map((e, i) => mapWordToResults(i + tempResults.length, false)),
            ];
            setGameResults(results);
            setFinished();
        }
    }, [gameFinished, tempResults]);

    useEffect(() => {
        const arr = tempResults.map((e) => (e.correct ? 1 : 0));
        if (arr.length >= 1) {
            const rightAnsw = arr.reduce((a, e) => a + e);
            setrightAnswers(rightAnsw);
            rightAnswersCallback(rightAnsw);
        }
    }, [tempResults, rightAnswersCallback, setrightAnswers]);

    useEffect(() => {
        return () => {
            clearTimeout(roundTimeout.current);
            clearTimeout(piuuTimeout.current);
        };
    }, []);

    return (
        <>
            <div className="game">
                {!ready ? (
                    <Timer callback={setReady} />
                ) : (
                    <>
                        <GameHeader lives={lives} finishGame={() => setGameFinished(true)} />
                        <WordToGuess
                            key={`wrd2gess_${words[round].word}`}
                            name={words[round].word}
                            roundResult={roundResult}
                        />
                        <Answers
                            active={roundResult === null}
                            translations={words[round].translations}
                            callback={finishRound}
                        />
                        <Crystal level={Math.floor(rightAnswers / 4)} correct={!!roundResult} />
                    </>
                )}
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setFinished: () => {
        dispatch(actions.gameState.set(utils.gameState.FINISHED));
    },
    setGameResults: (payload) => {
        dispatch(actions.gameResults.set(payload));
    },
});

const mapStateToProps = (state) => ({
    words: selectors.words(state),
});

GamePage.defaultProps = {
    words: null,
};

GamePage.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            word: PropTypes.string.isRequired,
            audio: PropTypes.string.isRequired,
            wordTranslate: PropTypes.string.isRequired,
            translations: PropTypes.arrayOf(
                PropTypes.exact({
                    word: PropTypes.string.isRequired,
                    correct: PropTypes.bool.isRequired,
                })
            ).isRequired,
        })
    ),
    setFinished: PropTypes.func.isRequired,
    setGameResults: PropTypes.func.isRequired,
    rightAnswersCallback: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
