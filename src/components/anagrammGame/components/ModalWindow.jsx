import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ModalWindow = ({ score, mistakes, funcPlayAgainHandler }) => {
    const ButtonPlayAgain = () => {
        return (
            <Button variant="contained" size="large" color="primary" onClick={funcPlayAgainHandler}>
                Play again
            </Button>
        );
    };

    return (
        <Typography variant="h4">
            <p>Total points: {score}</p>
            <p>Correct answrs: {score / 100}</p>
            <p>Wrong answers: {mistakes}</p>

            <ButtonPlayAgain />
        </Typography>
    );
};

ModalWindow.propTypes = {
    score: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    funcPlayAgainHandler: PropTypes.func.isRequired,
};

export default ModalWindow;
