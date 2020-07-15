import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './StartPage.scss';

const StartPage = ({ onClick, minWindow }) => {
    return minWindow ? (
        <div className="start-page">
            <p>Sorry, game is not supported on small screens.</p>
            <Link
                to="/"
                component={Button}
                color="primary"
                variant="contained"
                className="start-page__button"
            >
                Main page
            </Link>
        </div>
    ) : (
        <div className="start-page">
            <h2>ENGLISH-PUZZLE</h2>
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
    minWindow: PropTypes.bool,
};
StartPage.defaultProps = {
    minWindow: false,
};

export default StartPage;
