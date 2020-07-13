import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './StartPage.scss';

const StartPage = ({ onStart }) => (
    <section className="start-page-speakIt">
        <h1>Speakit</h1>
        <p>
            Click on the words to hear them sound.
            <br />
            Click on the start game button and speak the words into the microphone.
        </p>
        <Button
            variant="contained"
            color="primary"
            className="start-page__button"
            onClick={onStart}
        >
            Start
        </Button>
    </section>
);

StartPage.propTypes = {
    onStart: PropTypes.func.isRequired,
};

export default StartPage;
