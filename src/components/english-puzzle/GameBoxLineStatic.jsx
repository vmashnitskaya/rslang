import React from 'react';
import PropTypes from 'prop-types';
import GameBoxWordStatic from './GameBoxWordStatic';

const GameBoxLineStatic = ({ guessedArray, length }) => {
    const arrayOfWords = guessedArray.slice(0);
    const wordWidth = parseFloat(100 / length).toFixed(2);
    return (
        <>
            <div className="game__box-line">
                {arrayOfWords.map((word, index) => (
                    <GameBoxWordStatic
                        key={`${word}_${index + 1}`}
                        index={index}
                        text={word}
                        lastIndex={length - 1}
                        style={{ width: `${wordWidth}%` }}
                    />
                ))}
            </div>
        </>
    );
};

GameBoxLineStatic.propTypes = {
    guessedArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    length: PropTypes.number.isRequired,
};

export default GameBoxLineStatic;
