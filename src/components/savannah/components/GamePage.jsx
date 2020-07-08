/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import actions from '../storage/actions';
import selectors from '../storage/selectors';
import utils from '../utils';

function GamePage({ words, setFinished, gameState, setGameResults }) {
    const [sec, setSec] = useState(3);

    const [index, setIndex] = useState(0);
    const [roundFinished, setRoundFinished] = useState(null);
    const [gameFinished, setGameFinished] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [lives, setLives] = useState(new Array(5).fill(true));

    useEffect(() => {
        let id = null;
        if (sec > 0) {
            id = setTimeout(() => setSec((prev) => prev - 1), 1000000);
        } else {
            setRoundFinished(true);
        }
        return () => {
            if (id) {
                clearTimeout(id);
            }
        };
    }, [sec]);

    const mapWordToResults = (ind, correct) => {
        return {
            id: words[ind].id,
            word: words[ind].word,
            correct,
        };
    };

    const finishRound = (correct) => {
        setGameResults(mapWordToResults(index, correct));
        if (!correct) {
            setLives((prev) => {
                const newLivesArr = prev.slice();
                const ind = prev.indexOf(true);
                if (ind >= 0) {
                    newLivesArr[ind] = false;
                }
                return newLivesArr;
            });
        }
        if (index >= words.length - 1) {
            setGameFinished(true);
        } else {
            setIndex((prev) => prev + 1);
        }
        clearTimeout(timeoutId);
        setRoundFinished(true);
    };

    const finishGame = (ind) => {
        setGameResults(words.slice(ind).map((e, i) => mapWordToResults(i + ind, false)));
        setGameFinished(true);
        setRoundFinished(true);
    };

    useEffect(() => {
        if (lives.indexOf(true) < 0) {
            finishGame(index);
        }
    }, [lives]);

    useEffect(() => {
        if (gameFinished) {
            clearTimeout(timeoutId);
            setFinished();
        } else if (roundFinished) {
            const id = setTimeout(() => finishRound(false), 5000);
            setTimeoutId(id);
            setRoundFinished(false);
        }
    }, [roundFinished]);

    return (
        <div>
            {sec > 0 ? (
                sec
            ) : (
                <>
                    <div>
                        {lives.map((e, i) => {
                            const key = `live_${i}`;
                            return <p key={key}>{e ? 'O' : 'X'}</p>;
                        })}
                    </div>
                    <div>
                        <p>{words[index].word}</p>
                    </div>
                    <div>
                        {words[index].translations.map((e) => (
                            <p key={`wrd_${e.word}`} onClick={() => finishRound(e.correct)}>
                                {e.word}
                            </p>
                        ))}
                    </div>
                    <Button onClick={() => finishGame(index)} variant="contained">
                        Stop game
                    </Button>
                </>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setFinished: (payload) => {
        dispatch(actions.gameState.set(utils.gameState.FINISHED));
    },
    setGameResults: (payload) => {
        dispatch(actions.gameResults.set(payload));
    },
});

const mapStateToProps = (state) => ({
    words: selectors.words(state),
    gameState: selectors.gameState(state),
});

GamePage.defaultProps = {
    words: null,
};

GamePage.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            word: PropTypes.string.isRequired,
            translations: PropTypes.arrayOf(
                PropTypes.exact({
                    word: PropTypes.string.isRequired,
                    correct: PropTypes.bool.isRequired,
                })
            ).isRequired,
        })
    ),
    gameState: PropTypes.number.isRequired,
    setFinished: PropTypes.func.isRequired,
    setGameResults: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
