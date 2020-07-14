import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, text, onClick }) => {
    return (
        <button className={className} type="button" onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
