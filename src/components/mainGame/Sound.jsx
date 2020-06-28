import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import './Sound.scss';

const Sound = ({ audio }) => {
    const audioRef = useRef();
    const [audioPlaying, setAudioPlaying] = useState(false);

    const handleClick = useCallback(() => {
        setAudioPlaying(true);
        audioRef.current.play();
    }, [audio]);

    const hanlePlayedSound = () => {
        setAudioPlaying(false);
    };

    return (
        <>
            <VolumeUpIcon
                className="sound"
                color={audioPlaying ? 'primary' : undefined}
                role="button"
                tabIndex={0}
                onClick={handleClick}
            />
            <audio ref={audioRef} src={audio} type="audio/mpeg" onEnded={hanlePlayedSound} controls>
                <track kind="captions" />
            </audio>
        </>
    );
};

Sound.propTypes = {
    audio: PropTypes.string.isRequired,
};

export default Sound;
