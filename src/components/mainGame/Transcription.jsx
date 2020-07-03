import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Transcription = ({ transcription }) => (
    <Typography gutterBottom variant="h5" component="h2">
        {transcription && transcription.toLowerCase()}
    </Typography>
);

Transcription.propTypes = {
    transcription: PropTypes.string.isRequired,
};

export default Transcription;
