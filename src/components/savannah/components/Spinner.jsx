import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Spinner = () => (
    <div className="savannah-spinner-bg">
        <CircularProgress size="100px" color="secondary" />
    </div>
);

export default Spinner;
