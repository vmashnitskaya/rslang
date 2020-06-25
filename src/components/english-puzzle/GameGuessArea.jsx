import React from 'react';
import PropTypes from 'prop-types';
import PuzzleComponentSpan from './PuzzleComponentSpan';
import './GameGuessArea.scss';

const GameGuessArea = ({ shuffled, length, onClick }) => {
    const handleClick = (event) => {
        onClick(event.target.dataset.word, event.target.dataset.index);
    };

    const returnCorrectTags = (element, index) => {
        if (shuffled.first === element) {
            return (
                <>
                    <PuzzleComponentSpan className="r" index={index} word={element} />
                    <PuzzleComponentSpan className="text" index={index} word={element} />
                </>
            );
        }
        if (shuffled.last === element) {
            return (
                <>
                    <PuzzleComponentSpan className="l" index={index} word={element} />
                    <PuzzleComponentSpan className="text" index={index} word={element} />
                </>
            );
        }
        return (
            <>
                <PuzzleComponentSpan className="r" index={index} word={element} />
                <PuzzleComponentSpan className="l" index={index} word={element} />
                <PuzzleComponentSpan className="text" index={index} word={element} />
            </>
        );
    };
    const width = parseFloat(100 / length).toFixed(2) - 0.8;
    return shuffled.array.map((element, index) => (
        <div
            role="button"
            tabIndex={0}
            key={`${element}_${index + 1}`}
            data-word={element}
            className="guessed-word"
            style={{ width: `${width}%` }}
            onClick={handleClick}
            data-index={index}
        >
            {returnCorrectTags(element, index)}
        </div>
    ));
};

GameGuessArea.propTypes = {
    shuffled: PropTypes.shape({
        array: PropTypes.arrayOf(PropTypes.string),
        first: PropTypes.string,
        last: PropTypes.string,
    }).isRequired,
    length: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default GameGuessArea;
