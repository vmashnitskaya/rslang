import React from 'react';
import PropTypes from 'prop-types';
import './Translation.scss';

const Translation = ({ translation }) => {
    return <div className="translation">{translation}</div>;
};

Translation.propTypes = {
    translation: PropTypes.string,
};

Translation.defaultProps = {
    translation: '\u00a0',
};

export default Translation;
