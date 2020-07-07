import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const WordContent = ({ word, translate, audio }) => {
    const createLink = (file) =>
        `https://raw.githubusercontent.com/KarinaLogvina/rslang-data/master/data/${file.replace(
            'files/',
            ''
        )}`;
    const audioRef = useRef();

    const handleClick = () => {
        audioRef.current.play();
    };

    return (
        <Box className="card_content">
            <div className="word"> {word} </div>
            <div className="translate">{translate}</div>
            <Box onClick={handleClick} className="sound">
                <VolumeUpIcon color="primary" />
                <audio src={createLink(audio)} ref={audioRef}>
                    <track kind="captions" />
                </audio>
            </Box>
        </Box>
    );
};

WordContent.propTypes = {
    word: PropTypes.string.isRequired,
    translate: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
};

export default WordContent;
