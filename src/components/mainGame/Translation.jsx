import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Translation = ({ wordTranslate }) => (
    <Typography gutterBottom variant="h5" component="h2">
        {wordTranslate}
    </Typography>
);

Translation.propTypes = {
    wordTranslate: PropTypes.string.isRequired,
};

export default Translation;
