import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Answers({ translations, active, callback }) {
    const [pressedIndex, setPressedIndex] = useState(-1);

    function answerPressed(index, correct) {
        if (active) {
            setPressedIndex(index);
            callback(correct);
        }
    }

    useEffect(() => {
        setPressedIndex(-1);
    }, [translations]);

    useEffect(() => {
        const keypress = (event) => {
            if (['1', '2', '3', '4'].includes(event.key)) {
                const index = Number(event.key) - 1;
                if (!Number.isNaN(index)) {
                    answerPressed(index, translations[index].correct);
                }
            }
        };
        document.addEventListener('keypress', keypress);
        return () => document.removeEventListener('keypress', keypress);
    }, [translations]);

    return (
        <div className="game_answers">
            {translations.map((e, i) => {
                let style = null;
                if (e.correct && !active) {
                    style = { background: 'rgba(80,227,194,.15)' };
                }
                if (pressedIndex >= 0 && pressedIndex === i && !e.correct) {
                    style = { background: 'rgba(255,109,127,.3)' };
                }
                return (
                    <div
                        style={style}
                        key={`wrd_${e.word}`}
                        onClick={() => answerPressed(i, e.correct)}
                    >
                        <span>{i + 1}</span>
                        {e.word}
                    </div>
                );
            })}
        </div>
    );
}

Answers.propTypes = {
    translations: PropTypes.arrayOf(
        PropTypes.exact({
            word: PropTypes.string.isRequired,
            correct: PropTypes.bool.isRequired,
        })
    ).isRequired,
    active: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
};

export default Answers;
