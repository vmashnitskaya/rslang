import React from 'react';
import { CircularProgress } from '@material-ui/core';

import './styles.scss';

const Spinner = () => (
    <div className="spinner-bg">
        <CircularProgress size="100px" color="primary" />
    </div>
);

export default Spinner;
