import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../storage/actions';
import selectors from '../storage/selectors';
import '../styles.scss';
import StartPage from './StartPage';
import GamePage from './GamePage';
import StatisticsWindow from './StatisticsWindow';
import Spinner from '../../spinner/Spinner';
import ErrorHeandler from './ErrorHeandler';
import utils from '../utils';
import hooks from '../hooks';

function Savannah({ gameState, clear, error }) {
    const [rightAnswers, setrightAnswers] = useState(0);

    hooks.useUserWords();

    useEffect(() => {
        return () => {
            clear();
        };
    }, []);

    useEffect(() => {
        if (gameState === utils.gameState.NOT_STARTED && rightAnswers !== 0) {
            setrightAnswers(0);
        }
    }, [gameState, rightAnswers]);

    let content;
    if (error) {
        content = <ErrorHeandler message={error} />;
    } else {
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
                content = <GamePage rightAnswersCallback={setrightAnswers} />;
                break;
            case utils.gameState.FINISHED:
                content = <StatisticsWindow />;
                break;
            default:
                content = <StartPage />;
                break;
        }
    }

    return (
        <section className="savannah" style={{ backgroundPositionY: `${100 - rightAnswers * 5}%` }}>
            {content}
        </section>
    );
}

const mapDispatchToProps = (dispatch) => ({
    clear: () => {
        dispatch(actions.words.clear());
        dispatch(actions.gameState.set(utils.gameState.NOT_STARTED));
        dispatch(actions.gameResults.clear());
    },
});

const mapStateToProps = (state) => ({
    gameState: selectors.gameState(state),
    error: selectors.message(state),
});

Savannah.defaultProps = {
    error: null,
};

Savannah.propTypes = {
    gameState: PropTypes.number.isRequired,
    error: PropTypes.string,
    clear: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Savannah);
