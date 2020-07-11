import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import { Tooltip, Zoom } from '@material-ui/core';
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
    isAudioExampleEnabled,
    isAudioMeaningEnabled,
    isSoundEnabled,
    handleSoundPerformed,
}) => {
    const classes = useStyles();
    const audioRef = useRef();
    const audioMeaningRef = useRef();
    const audioExampleRef = useRef();

    const playSound = useCallback(
        (ref) =>
            new Promise((resolve) => {
                ref.current.play();
                ref.current.addEventListener('ended', resolve, { once: true });
            }),
        [isSoundEnabled]
    );

    useEffect(() => {
        (async () => {
            if (isSoundEnabled) {
                await playSound(audioRef);
            }
            if (isAudioMeaningEnabled && isSoundEnabled) {
                await playSound(audioMeaningRef);
            }
            if (isAudioExampleEnabled && isSoundEnabled) {
                await playSound(audioExampleRef);
            }
            if (isSoundEnabled) {
                handleSoundPerformed();
            }
        })();
    }, [isSoundEnabled, handleSoundPerformed, playSound]);

    return (
        <>
            {isAutoSoundEnabled ? (
                <Tooltip title="Autosound" placement="bottom" TransitionComponent={Zoom}>
                    <MusicNoteIcon
                        className={classes.root}
                        color="primary"
                        onClick={handleAutoSoundEnabled}
                        fontSize="large"
                    />
                </Tooltip>
            ) : (
                <Tooltip title="Autosound" placement="bottom" TransitionComponent={Zoom}>
                    <MusicOffIcon
                        className={classes.root}
                        color="primary"
                        onClick={handleAutoSoundEnabled}
                        fontSize="large"
                    />
                </Tooltip>
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
    isAudioExampleEnabled: PropTypes.bool.isRequired,
    isAudioMeaningEnabled: PropTypes.bool.isRequired,
    isSoundEnabled: PropTypes.bool.isRequired,
    handleSoundPerformed: PropTypes.bool.isRequired,
};

export default Sound;
