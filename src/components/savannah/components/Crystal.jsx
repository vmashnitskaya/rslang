import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Crystal({ level, correct }) {
    useEffect(() => {
        if (level > 0) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = '/assets/audio/savannah/levelUp.mp3';
            audio.play();
        }
    }, [level]);

    return (
        <div className="crystal">
            <div>
                <div className="img-move">
                    <div className="img-move_bg">
                        <div className="img-move_bg-inner" />
                    </div>
                    <div
                        className="img-move_imgs"
                        style={{ transform: `scale(${0.3 + 0.2 * level})` }}
                    >
                        <i className="img-1" />
                        <i className="img-2" />
                        <i className="img-3" />
                        <i className="img-4" />
                    </div>
                </div>
                <div className="circle" style={{ opacity: correct ? 1 : 0 }}>
                    <div className="round1" />
                    <div className="round2" />
                    <div className="round3" />
                </div>
                <div className="points">
                    <i className="point1" />
                    <i className="point2" />
                    <i className="point3" />
                    <i className="point4" />
                    <i className="point5" />
                    <i className="point6" />
                    <i className="point7" />
                    <i className="point8" />
                    <i className="point9" />
                    <i className="point10" />
                </div>
            </div>
        </div>
    );
}

Crystal.propTypes = {
    level: PropTypes.number.isRequired,
    correct: PropTypes.bool.isRequired,
};

export default Crystal;
