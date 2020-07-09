import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Card.scss';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Paper from '@material-ui/core/Paper';

const Card = ({ card, isSelected, onCardSelected, isGuessed }) => {
    const audioRef = useRef();
    const handleClick = () => {
        audioRef.current.play();
        onCardSelected(card);
    };

    return (
        <Paper
            className={clsx('card', isSelected && 'selected', isGuessed && 'guessed')}
            onClick={handleClick}
        >
            <VolumeUpIcon color="primary" />
            <div className="card__description">
                <p className="card__description-word">{card.word}</p>
                <p className="card__description-transcription">{card.transcription}</p>
                <audio ref={audioRef} src={card.audio} type="audio/mpeg">
                    <track kind="captions" />
                </audio>
            </div>
        </Paper>
    );
};

Card.propTypes = {
    card: PropTypes.shape({
        word: PropTypes.string.isRequired,
        transcription: PropTypes.string.isRequired,
        audio: PropTypes.string.isRequired,
    }).isRequired,
    onCardSelected: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isGuessed: PropTypes.bool.isRequired,
};

export default Card;
