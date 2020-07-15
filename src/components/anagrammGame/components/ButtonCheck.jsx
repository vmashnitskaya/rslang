import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ButtonCheck = ({ funcNextTurn }) => {
    return (
        <Button variant="contained" color="primary" size="large" onClick={funcNextTurn}>
            Next word
        </Button>
    );
};

ButtonCheck.propTypes = {
    funcNextTurn: PropTypes.func.isRequired,
};
export default ButtonCheck;
