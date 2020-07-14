import React from 'react';
import PropTypes from 'prop-types';
import PuzzleComponentSpan from './PuzzleComponentSpan';

const GameBoxWordStatic = ({ text, style, index, lastIndex }) => {
    const returnCorrectTags = () => {
        if (index === 0) {
            return (
                <>
                    <PuzzleComponentSpan className="r" index={index} word={text} />
                    <PuzzleComponentSpan className="text" index={index} word={text} />
                </>
            );
        }
        if (index === lastIndex) {
            return (
                <>
                    <PuzzleComponentSpan className="l" index={index} word={text} />
                    <PuzzleComponentSpan className="text" index={index} word={text} />
                </>
            );
        }
        return (
            <>
                <PuzzleComponentSpan className="r" index={index} word={text} />
                <PuzzleComponentSpan className="l" index={index} word={text} />
                <PuzzleComponentSpan className="text" index={index} word={text} />
            </>
        );
    };
    return (
        <div className="game__box-word static" style={style}>
            {returnCorrectTags()}
        </div>
    );
};

GameBoxWordStatic.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.shape({
        width: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    lastIndex: PropTypes.number.isRequired,
};

export default GameBoxWordStatic;
