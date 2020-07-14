import React from 'react';
import { Paper } from '@material-ui/core';

const TodayAchivmentsWidget = () => {
    return (
        <Paper elevation={3} className="today">
            <h3>Today</h3>
            <div className="today_statistics">
                <Paper elevation={3}>
                    <h5>Learned words</h5>
                    <p>4</p>
                </Paper>
                <Paper elevation={3}>
                    <h5>Sucessfull answers</h5>
                    <p>40%</p>
                </Paper>
                <Paper elevation={3}>
                    <h5>Best sequence</h5>
                    <p>10</p>
                </Paper>
            </div>
        </Paper>
    );
};

export default TodayAchivmentsWidget;
