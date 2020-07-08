/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import actions from '../storage/actions';
import selectors from '../storage/selectors';
import utils from '../utils';

function StatisticsWindow({ results, clear }) {
    useEffect(() => {
        return () => {
            clear();
        };
    }, []);

    return (
        <div>
            <h2>The end</h2>
            <div>
                {results.map((e, i) => (
                    <div key={`res_${e.word}`}>
                        <p>{i}</p>
                        <p>{e.word}</p>
                        <p>{e.correct ? 'right' : 'wrong'}</p>
                    </div>
                ))}
            </div>
            <Button onClick={clear} variant="contained">
                New game
            </Button>
        </div>
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
    results: selectors.gameResults(state),
});

StatisticsWindow.defaultProps = {};

StatisticsWindow.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            word: PropTypes.string.isRequired,
            correct: PropTypes.bool.isRequired,
        })
    ).isRequired,
    clear: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsWindow);
