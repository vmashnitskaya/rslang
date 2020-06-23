import React from 'react';
import propTypes from 'prop-types';

const Message = ({ className, text }) => {
    return <div className={className}>{text}</div>;
};

Message.propTypes = {
    className: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
};

export default Message;
