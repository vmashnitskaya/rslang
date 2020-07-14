import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const LevelBlock = ({ funcSetLevel }) => {
    const allLevels = 6;
    const arrayButtonsLevel = [];
    for (let i = 1; i <= allLevels; i += 1) {
        const key = 'lvlblck';
        const buttonLevel = (
            <Button
                key={key + i}
                color="secondary"
                size="large"
                onClick={(event) => funcSetLevel(event.target.innerText)}
            >
                {i}
            </Button>
        );
        arrayButtonsLevel.push(buttonLevel);
    }
    return arrayButtonsLevel;
};

LevelBlock.propTypes = {
    funcSetLevel: PropTypes.func.isRequired,
};

export default LevelBlock;
