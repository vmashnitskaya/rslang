import React, { useRef, useCallback, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { makeStyles } from '@material-ui/core/styles';
import './WordRow.scss';

const useStyles = makeStyles({
    root: {
        width: '10%',
    },
});

const WordRow = ({ element, index, onButtonClick, settings, isButtonDisabled }) => {
    const audioRef = useRef();
    const [audioPlaying, setAudioPlaying] = useState(false);
    const classes = useStyles();

    const handleClick = useCallback(() => {
        setAudioPlaying(true);
        audioRef.current.play();
    }, []);

    const hanlePlayedSound = () => {
        setAudioPlaying(false);
    };

    const onClick = () => {
        if (onButtonClick) onButtonClick(element);
    };

    return (
        <TableRow className="word-row">
            <TableCell index={index} align="left">
                <div className="word-cell-vocabulary">
                    <div className="word-vocabulary">
                        <p className="translation-vocabulary">
                            {element.word}{' '}
                            {settings.optional.isShowTranscription && ` ${element.transcription} `}
                            {settings.optional.isShowTranslate && ` ${element.wordTranslate}`}
                            {'   '}
                            <VolumeUpIcon
                                className="sound-vocabulary"
                                color={audioPlaying ? 'primary' : undefined}
                                role="button"
                                tabIndex={0}
                                onClick={handleClick}
                            />
                        </p>
                        {settings.optional.isShowTextMeaning && (
                            <p className="text-meaning-vocabulary">{element.textMeaning}</p>
                        )}
                        {settings.optional.isShowTextExample && (
                            <p className="text-example-vocabulary">{element.textExample}</p>
                        )}
                    </div>
                    {settings.optional.isShowImage && (
                        <div className="picture-vocabulary">
                            <img src={element.image} alt={element.word} />
                        </div>
                    )}
                    <audio
                        ref={audioRef}
                        src={element.audio}
                        type="audio/mpeg"
                        onEnded={hanlePlayedSound}
                    >
                        <track kind="captions" />
                    </audio>
                </div>
            </TableCell>
            {onButtonClick && (
                <TableCell className={classes.root}>
                    <Button
                        className="restore-button"
                        variant="outlined"
                        color="primary"
                        onClick={onClick}
                        size="small"
                        disabled={isButtonDisabled}
                    >
                        Restore
                    </Button>
                </TableCell>
            )}
        </TableRow>
    );
};

WordRow.propTypes = {
    element: PropTypes.shape({
        id: PropTypes.string,
        word: PropTypes.string,
        audio: PropTypes.string,
        image: PropTypes.string,
        transcription: PropTypes.string,
        wordTranslate: PropTypes.string,
        textExample: PropTypes.string,
        textMeaning: PropTypes.string,
        userWord: PropTypes.shape({
            difficulty: PropTypes.string,
            optional: PropTypes.shape({
                learned: PropTypes.bool,
                difficult: PropTypes.bool,
                deleted: PropTypes.bool,
                repeat: PropTypes.bool,
            }),
        }),
    }).isRequired,
    index: PropTypes.number.isRequired,
    onButtonClick: PropTypes.func,
    settings: PropTypes.shape({
        wordsPerDay: PropTypes.number,
        optional: PropTypes.objectOf(PropTypes.bool),
    }).isRequired,
    isButtonDisabled: PropTypes.bool.isRequired,
};

WordRow.defaultProps = {
    onButtonClick: undefined,
};

export default WordRow;
