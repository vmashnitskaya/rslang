import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import './Loading.scss';

const Loading = ({ error, errorAggr }) => {
    return (
        <div className="loader-wrapper-speakit">
            <CircularProgress color="primary" />
            {(error || errorAggr) && (
                <div className="error-message">
                    Sorry for inconvenience, please try again later.
                </div>
            )}
        </div>
    );
};

Loading.propTypes = {
    error: PropTypes.bool,
    errorAggr: PropTypes.bool,
};

Loading.defaultProps = {
    error: false,
    errorAggr: false,
};

export default Loading;
