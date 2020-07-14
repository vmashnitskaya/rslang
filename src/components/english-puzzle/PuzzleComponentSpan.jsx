import React from 'react';
import PropTypes from 'prop-types';

const PuzzleComponentSpan = ({ className, index, word }) => {
    return (
        <span className={className} data-index={index} data-word={word}>
            {className === 'text' && word}
        </span>
    );
};

PuzzleComponentSpan.propTypes = {
    className: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
};

export default PuzzleComponentSpan;
