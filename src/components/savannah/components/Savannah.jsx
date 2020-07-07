/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../storage/actions';
import selectors from '../storage/selectors';
import '../styles.scss';
import StartPage from './StartPage';
import GamePage from './GamePage';
import StatisticsWindow from './StatisticsWindow';
import Spinner from './Spinner';
import utils from '../utils';

function Savannah({ gameState, clear }) {
    useEffect(() => {
        return () => {
            clear();
        };
    }, []);

    let content;
    switch (gameState) {
        case utils.gameState.LOADING_DATA:
            content = (
                <>
                    <StartPage />
                    <Spinner />
                </>
            );
            break;
        case utils.gameState.IN_PROGRESS:
            content = <GamePage />;
            break;
        case utils.gameState.FINISHED:
            content = <StatisticsWindow />;
            break;
        default:
            content = <StartPage />;
            break;
    }

    return <section className="savannah">{content}</section>;
}

const mapDispatchToProps = (dispatch) => ({
    clear: () => {
        dispatch(actions.words.clear());
        dispatch(actions.gameState.set(utils.gameState.NOT_STARTED));
    },
});

const mapStateToProps = (state) => ({
    gameState: selectors.gameState(state),
});

Savannah.defaultProps = {
    // words: null,
};

Savannah.propTypes = {
    gameState: PropTypes.number.isRequired,
    clear: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Savannah);
