import React from 'react';
import PropTypes from 'prop-types';
import Lives from './Lives';

function GameHeader({ lives, finishGame }) {
    return (
        <div className="game_header">
            <Lives lives={lives} />
            <div className="close_game" onClick={() => finishGame()} variant="contained">
                <i className="fas fa-times" />
            </div>
        </div>
    );
}

GameHeader.propTypes = {
    lives: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
    finishGame: PropTypes.func.isRequired,
};

export default GameHeader;
