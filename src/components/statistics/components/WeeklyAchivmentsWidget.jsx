import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { Paper } from '@material-ui/core';
import selectors from '../selectors';
import settingsSelectors from '../../router/storage/getSettingsRedux/settingsSelectors';

const WeeklyAchivmentsWidget = ({ weeklyAchivments, wordsPerDay }) => {
    return (
        <Paper elevation={3} className="week">
            <h3>Weekly progress</h3>
            <div className="week_statistics">
                <h4>Today&apos;s goal:</h4>
                <p>Complete {wordsPerDay} cards</p>
            </div>
            <div className="allweek">
                {weeklyAchivments.map((e) => (
                    <div key={`wstatwidday_${e.day}`}>
                        {e.value ? <CheckIcon /> : <ClearIcon />}
                        <p className={e.today ? 'active' : ''}>{e.day}</p>
                    </div>
                ))}
            </div>
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    weeklyAchivments: selectors.weeklyAchivments(state),
    wordsPerDay: settingsSelectors.getWordsPerDay(state),
});

WeeklyAchivmentsWidget.propTypes = {
    weeklyAchivments: PropTypes.arrayOf(
        PropTypes.exact({
            day: PropTypes.string.isRequired,
            value: PropTypes.bool.isRequired,
            today: PropTypes.bool.isRequired,
        })
    ).isRequired,
    wordsPerDay: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WeeklyAchivmentsWidget);
