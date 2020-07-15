import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import statisticsSelectors from '../../router/storage/getPutStatisticsRedux/statisticsSelectors';

const TodayAchivmentsWidget = ({ statistics }) => {
    return (
        <Paper elevation={3} className="today">
            <h3>Today</h3>
            <div className="today_statistics">
                <Paper elevation={3}>
                    <h5>Learned words</h5>
                    <p>{statistics.l}</p>
                </Paper>
                <Paper elevation={3}>
                    <h5>Sucessfull answers</h5>
                    <p>{Math.round((statistics.s / (statistics.s + statistics.e)) * 100)}%</p>
                </Paper>
                <Paper elevation={3}>
                    <h5>Best sequence</h5>
                    <p>{statistics.msq}</p>
                </Paper>
            </div>
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    statistics: statisticsSelectors.getTodayMainGameStatistics(state),
});

TodayAchivmentsWidget.propTypes = {
    statistics: PropTypes.shape({
        d: PropTypes.number.isRequired,
        l: PropTypes.number.isRequired,
        s: PropTypes.number.isRequired,
        e: PropTypes.number.isRequired,
        sq: PropTypes.number.isRequired,
        msq: PropTypes.number.isRequired,
        n: PropTypes.number.isRequired,
    }).isRequired,
};

export default connect(mapStateToProps)(TodayAchivmentsWidget);
