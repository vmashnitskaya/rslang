import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ButtonStartGame = ({ funcGame }) => {
    return (
        <Button variant="contained" size="large" color="primary" onClick={funcGame}>
            Start the game
        </Button>
    );
};

ButtonStartGame.propTypes = {
    funcGame: PropTypes.func.isRequired,
};

export default ButtonStartGame;
