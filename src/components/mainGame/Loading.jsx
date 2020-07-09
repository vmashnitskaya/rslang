import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loading.scss';

const Loading = ({ error, settingsError }) => {
    return (
        <div className="loading-wrapper">
            <CircularProgress color="primary" />
            {(error || settingsError) && (
                <div className="error-message">
                    Sorry for inconvenience, please try again later.
                </div>
            )}
        </div>
    );
};

Loading.propTypes = {
    error: PropTypes.bool.isRequired,
    settingsError: PropTypes.bool.isRequired,
};

export default Loading;
