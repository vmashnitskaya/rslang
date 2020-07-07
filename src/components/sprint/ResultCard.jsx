import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './ResultCard.scss';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ResultCard = ({ word, translation, audio }) => {
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
        <>
            <TableRow className="result-row" onClick={handleClick}>
                <TableCell align="left">
                    <VolumeUpIcon color="primary" className="sound" />
                    <audio src={createLink(audio)} ref={audioRef}>
                        <track kind="captions" />
                    </audio>
                </TableCell>
                <TableCell align="left" colSpan={2}>
                    {word}
                </TableCell>
                <TableCell align="left" colSpan={2}>
                    {translation}
                </TableCell>
            </TableRow>
        </>
    );
};
ResultCard.propTypes = {
    word: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
};
export default ResultCard;
