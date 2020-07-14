import React from 'react';
import PropTypes from 'prop-types';
import './Loader.scss';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ error, errorAggr }) => {
    return (
        <div className="loader-wrapper">
            <CircularProgress color="primary" />
            {(error || errorAggr) && (
                <div className="error-message">Sorry for inconvenience, try again later.</div>
            )}
        </div>
    );
};

Loader.propTypes = {
    error: PropTypes.bool.isRequired,
    errorAggr: PropTypes.bool.isRequired,
};

export default Loader;
