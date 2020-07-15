import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import useStyles from './style';
import StartMassege from './StartMessage';
import LevelBlock from './LevelBlock';
import ButtonStartGame from './ButtonStartGame';

const StartGameNode = ({ funcStartGame, level, funcSetLevel }) => {
    const classes = useStyles();
    return (
        <div>
            <StartMassege />
            <LevelBlock className={classes.root} funcSetLevel={funcSetLevel} />
            {level && (
                <div>
                    <Typography variant="h6">
                        Level choosed: {level}. To start the game, click start game
                    </Typography>
                    <ButtonStartGame
                        funcGame={() => {
                            funcStartGame();
                        }}
                    />
                </div>
            )}
        </div>
    );
};

StartGameNode.propTypes = {
    level: PropTypes.string,
    funcStartGame: PropTypes.func.isRequired,
    funcSetLevel: PropTypes.func.isRequired,
};

StartGameNode.defaultProps = {
    level: null,
};

export default StartGameNode;
