import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PuzzleComponentSpan from './PuzzleComponentSpan';

const GameBoxWord = ({ className, text, index, style, onClick, firstWord, lastWord }) => {
    const handleClick = () => {
        onClick(text, index);
    };

    const returnCorrectTags = () => {
        if (text === firstWord) {
            return (
                <>
                    <PuzzleComponentSpan className="r" index={index} word={text} />
                    <PuzzleComponentSpan className="text" index={index} word={text} />
                </>
            );
        }
        if (text === lastWord) {
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
        <div
            role="button"
            tabIndex={0}
            className={clsx('game__box-word', `${className}`)}
            index={index}
            style={style}
            onClick={handleClick}
        >
            {returnCorrectTags()}
        </div>
    );
};

GameBoxWord.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    style: PropTypes.shape({
        width: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    firstWord: PropTypes.string.isRequired,
    lastWord: PropTypes.string.isRequired,
};

export default GameBoxWord;
