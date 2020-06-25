import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './StartPage.scss';

const StartPage = ({ onClick }) => {
    return (
        <div className="start-page">
            <h1>English-Puzzle</h1>
            <p>Click on words, collect phrases.</p>
            <p>Select hints in menu.</p>
            <Button
                variant="contained"
                className="start-page__button"
                onClick={onClick}
                color="primary"
            >
                Start
            </Button>
        </div>
    );
};

StartPage.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default StartPage;
