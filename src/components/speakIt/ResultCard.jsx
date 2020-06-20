import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './ResultCard.scss';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ResultCard = ({ word, translation, audio }) => {
    const audioRef = useRef();

    const handleClick = () => {
        audioRef.current.play();
    };
    return (
        <TableRow className="result-row" onClick={handleClick}>
            <TableCell align="left">
                <VolumeUpIcon color="primary" className="sound" />
            </TableCell>
            <TableCell align="left" colSpan={2}>
                {word}
            </TableCell>
            <TableCell align="left" colSpan={2}>
                {translation}
            </TableCell>
            <audio src={audio} ref={audioRef}>
                <track kind="captions" />
            </audio>
        </TableRow>
    );
};

ResultCard.propTypes = {
    word: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
};

export default ResultCard;
