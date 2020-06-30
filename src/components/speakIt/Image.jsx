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
    image: PropTypes.string,
    word: PropTypes.string,
};

Image.defaultProps = {
    word: '',
    image: '',
};

export default Image;
