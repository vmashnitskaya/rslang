import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Timer({ callback }) {
    const [sec, setSec] = useState(3);

    useEffect(() => {
        let id = null;
        if (sec > 0) {
            id = setTimeout(() => setSec((prev) => prev - 1), 1000);
        } else {
            callback(true);
        }
        return () => {
            if (id) {
                clearTimeout(id);
            }
        };
    }, [sec]);

    return (
        <div className="timer">
            <div className="loading">
                <i className="round1" />
                <i className="round2" />
                <i className="round3" />
                <div className="count">{sec}</div>
            </div>
        </div>
    );
}

Timer.propTypes = {
    callback: PropTypes.func.isRequired,
};

export default Timer;
