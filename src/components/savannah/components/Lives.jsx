import React from 'react';
import PropTypes from 'prop-types';

function Lives({ lives }) {
    return (
        <div className="lives">
            {lives.map((e, i) => {
                const key = `live_${i}`;
                return <i key={key} className={e ? 'fas fa-heart' : 'fas fa-heart-broken'} />;
            })}
        </div>
    );
}

Lives.propTypes = {
    lives: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
};

export default Lives;
