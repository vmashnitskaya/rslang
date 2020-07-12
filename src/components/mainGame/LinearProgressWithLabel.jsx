import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Box, Typography } from '@material-ui/core';

const LinearProgressWithLabel = ({ toLearn, learned }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress
                    variant="determinate"
                    color="primary"
                    value={learned > toLearn ? 100 : (learned / toLearn) * 100}
                />
            </Box>
            <Box minWidth={25}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                >{`${learned}/${toLearn}`}</Typography>
            </Box>
        </Box>
    );
};

LinearProgressWithLabel.propTypes = {
    toLearn: PropTypes.number.isRequired,
    learned: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;
