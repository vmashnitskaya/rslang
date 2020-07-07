import React from 'react';
import PropTypes from 'prop-types';

const PopUp = ({ open, children }) => {
    return open ? (
        <div className="pop-up-layer">
            <div className="pop-up">{children}</div>
        </div>
    ) : null;
};

PopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.string.isRequired,
};

export default PopUp;
