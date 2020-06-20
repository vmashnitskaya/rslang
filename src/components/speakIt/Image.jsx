import React from 'react';
import PropTypes from 'prop-types';
import './Image.scss';

const Image = ({ image, word }) => {
    return (
        <div className="image">
            <img src={image} alt={word} />
        </div>
    );
};

Image.propTypes = {
    image: PropTypes.string.isRequired,
    word: PropTypes.string,
};

Image.defaultProps = {
    word: '',
};

export default Image;
