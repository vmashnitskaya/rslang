import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './ResultCard.scss';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ResultCard = ({ text, translation, pronunciation }) => {
    const audioRef = useRef();

    const handleClick = () => {
        audioRef.current.play();
    };
    return (
        <>
            <TableRow className="result-row" onClick={handleClick}>
                <TableCell align="left">
                    <VolumeUpIcon color="primary" className="sound" />
                    <audio src={pronunciation} ref={audioRef}>
                        <track kind="captions" />
                    </audio>
                </TableCell>
                <TableCell align="left" colSpan={5}>
                    <p>{text}</p>
                    <p>{translation}</p>
                </TableCell>
            </TableRow>
        </>
    );
};

ResultCard.propTypes = {
    text: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
    pronunciation: PropTypes.string.isRequired,
};

export default ResultCard;
