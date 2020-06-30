import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import './Sound.scss';

const useStyles = makeStyles(() => ({
    root: {
        cursor: 'pointer',
    },
}));

const Sound = ({
    audio,
    audioExample,
    audioMeaning,
    handleAutoSoundEnabled,
    isAutoSoundEnabled,
    isAudioEnabled,
    isAudioExampleEnabled,
    isAudioMeaningEnabled,
    isSoundEnabled,
    handleSoundPerformed,
}) => {
    const classes = useStyles();
    const audioRef = useRef();
    const audioMeaningRef = useRef();
    const audioExampleRef = useRef();

    const playSound = (ref) => {
        return new Promise((resolve) => {
            if (isAudioEnabled) {
                ref.current.play();
                ref.current.addEventListener('ended', resolve, { once: true });
            }
        });
    };

    useEffect(() => {
        (async () => {
            if (isAudioEnabled && isSoundEnabled) {
                await playSound(audioRef);
            }
            if (isAudioExampleEnabled && isSoundEnabled) {
                await playSound(audioExampleRef);
            }
            if (isAudioMeaningEnabled && isSoundEnabled) {
                await playSound(audioMeaningRef);
            }
            handleSoundPerformed();
        })();
    }, [isSoundEnabled]);

    return (
        <>
            {isAutoSoundEnabled ? (
                <MusicNoteIcon
                    className={classes.root}
                    color="primary"
                    onClick={handleAutoSoundEnabled}
                    fontSize="large"
                />
            ) : (
                <MusicOffIcon
                    className={classes.root}
                    color="primary"
                    onClick={handleAutoSoundEnabled}
                    fontSize="large"
                />
            )}
            <audio ref={audioRef} src={audio} type="audio/mpeg">
                <track kind="captions" />
            </audio>
            <audio ref={audioMeaningRef} src={audioMeaning} type="audio/mpeg">
                <track kind="captions" />
            </audio>
            <audio ref={audioExampleRef} src={audioExample} type="audio/mpeg">
                <track kind="captions" />
            </audio>
        </>
    );
};

Sound.propTypes = {
    audio: PropTypes.string.isRequired,
    audioExample: PropTypes.string.isRequired,
    audioMeaning: PropTypes.string.isRequired,
    isAutoSoundEnabled: PropTypes.bool.isRequired,
    handleAutoSoundEnabled: PropTypes.func.isRequired,
    isAudioEnabled: PropTypes.bool.isRequired,
    isAudioExampleEnabled: PropTypes.bool.isRequired,
    isAudioMeaningEnabled: PropTypes.bool.isRequired,
    isSoundEnabled: PropTypes.bool.isRequired,
    handleSoundPerformed: PropTypes.bool.isRequired,
};

export default Sound;
