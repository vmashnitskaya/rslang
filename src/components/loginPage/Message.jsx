import React from 'react';
import propTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const Message = ({ className, text }) => {
    return (
        <Box align="center" margin="normal" className={className}>
            <Typography color="error">{text}</Typography>
        </Box>
    );
};

Message.propTypes = {
    className: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
};

export default Message;
