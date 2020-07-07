import React from 'react';
import PropTypes from 'prop-types';
import MicIcon from '@material-ui/icons/Mic';
import './SpeechRecognitionText.scss';

const SpeechRecognitionText = ({ text }) => {
    return (
        <div className="recognition">
            <MicIcon className="microfon" color="primary" />
            <div className="text">{text}</div>
        </div>
    );
};

SpeechRecognitionText.propTypes = {
    text: PropTypes.string,
};

SpeechRecognitionText.defaultProps = {
    text: '\u00a0',
};

export default SpeechRecognitionText;
