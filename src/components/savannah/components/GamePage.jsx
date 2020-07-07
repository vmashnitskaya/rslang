/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import actions from '../storage/actions';
import selectors from '../storage/selectors';
import utils from '../utils';

function GamePage({ words, setFinished, gameState }) {
    const [sec, setSec] = useState(3);

    useEffect(() => {
        let id = null;
        if (sec > 0) {
            id = setTimeout(() => setSec((prev) => prev - 1), 1000);
        }
        return () => {
            if (id) {
                clearTimeout(id);
            }
        };
    }, [sec]);

    const [index, setIndex] = useState(0);

    const [results, setResults] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);

    function wordClick(word, correct) {
        console.log(correct);
        setResults((prev) => {
            const arr = [
                ...prev,
                {
                    id: word.id,
                    word: word.word,
                    correct,
                },
            ];
            return arr;
        });
        if (index + 1 < words.length) {
            setIndex((prev) => prev + 1);
        } else {
            console.log(results);
            setFinished();
        }
    }

    useEffect(() => {
        let id = null;
        if (sec <= 0) {
            id = setTimeout(() => {
                setResults((prev) => {
                    console.log(false);
                    const arr = [
                        ...prev,
                        {
                            id: words[index].id,
                            word: words[index].word,
                            correct: false,
                        },
                    ];
                    return arr;
                });
                if (index + 1 < words.length) {
                    setIndex((prev) => prev + 1);
                } else {
                    console.log(results);
                    setFinished();
                }
            }, 5000);
        }
        setTimeoutId(id);
        return () => {
            if (id) {
                clearTimeout(id);
            }
        };
    }, [sec, index]);

    return (
        <div>
            {sec > 0 ? (
                sec
            ) : (
                <>
                    <div>
                        <p>{words[index].word}</p>
                    </div>
                    <div>
                        {words[index].translations.map((e) => (
                            <p onClick={() => wordClick(words[index], e.correct)}>{e.word}</p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setFinished: (payload) => {
        dispatch(actions.gameState.set(utils.gameState.FINISHED));
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
    words: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        word: PropTypes.string.isRequired,
        translations: PropTypes.arrayOf({
            word: PropTypes.string.isRequired,
            correct: PropTypes.bool.isRequired,
        }),
    }),
    gameState: PropTypes.number.isRequired,
    setFinished: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
