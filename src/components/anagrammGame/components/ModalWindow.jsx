import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import statisticsActions from '../../router/storage/getPutStatisticsRedux/statisticsActions';
import statisticsUtils from '../../router/storage/getPutStatisticsRedux/statisticsUtils';

const ModalWindow = ({ score, mistakes, funcPlayAgainHandler, setStatistics }) => {
    const ButtonPlayAgain = () => {
        return (
            <Button variant="contained" size="large" color="primary" onClick={funcPlayAgainHandler}>
                Play again
            </Button>
        );
    };

    useEffect(() => {
        setStatistics(score / 100 + mistakes, score / 100);
    }, []);

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
    setStatistics: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setStatistics: (total, correct) =>
        dispatch(
            statisticsActions.updateStaticsMiniGame(
                statisticsUtils.miniGames.anagramm.alias,
                total,
                correct
            )
        ),
});

export default connect(null, mapDispatchToProps)(ModalWindow);
