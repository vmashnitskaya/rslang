import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const ResultCard = ({ word, translation, transcription, audio }) => {
    const audioRef = useRef();

    const handleClick = () => {
        audioRef.current.play();
    };
    return (
        <div className="result-row" onClick={handleClick}>
            <div>soundicon</div>
            <div className="words">
                <div>{word}</div>
                <div>{transcription}</div>
                <div>{translation}</div>
            </div>
            <audio src={audio} ref={audioRef}>
                <track kind="captions" />
            </audio>
        </div>
    );
};

ResultCard.propTypes = {
    word: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
    transcription: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
};

export default ResultCard;
