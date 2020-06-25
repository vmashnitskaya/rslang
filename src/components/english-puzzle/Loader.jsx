import React from 'react';
import PropTypes from 'prop-types';
import './Loader.scss';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ error }) => {
    return (
        <div className="loader-wrapper">
            <CircularProgress color="primary" />
            {error && (
                <div className="error-message">Sorry for inconvenience, try again later.</div>
            )}
        </div>
    );
};

Loader.propTypes = {
    error: PropTypes.bool.isRequired,
};

export default Loader;
