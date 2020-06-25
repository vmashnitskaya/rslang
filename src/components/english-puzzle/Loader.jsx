import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <CircularProgress color="primary" />
        </div>
    );
};

export default Loader;
