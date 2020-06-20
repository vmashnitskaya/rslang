import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const StartPage = ({ onStart }) => (
    <div className="start-page">
        <h1>Speakit</h1>
        <p>
            Click on the words to hear them sound.
            <br />
            Click on the start game button and speak the words into the microphone.
        </p>
        <Button className="start-page__button" onClick={onStart}>
            Start
        </Button>
    </div>
);

StartPage.propTypes = {
    onStart: PropTypes.func.isRequired,
};

export default StartPage;
