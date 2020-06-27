import React from 'react';
import { Button, Box, Paper } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import Timer from './Timer';
import './styles.scss';

const App = () => {
    const {}

    return (
        <Box className="sprint-game">
            <Box className="score_container">
                <Timer />
                <Box className="srtrick">
                    <StarIcon color="primary" />
                </Box>
                <Box className="score">0</Box>
            </Box>
            <Paper className="card" elevation={3}>
                <Box className="card_content">
                    <div className="word">Word </div>
                    <div className="translate">Translation</div>
                    <img src="./assets/images/scared.jpg" alt="img" className="card_img" />
                </Box>
                <Box className="button_container">
                    <Button className="button_wrong" variant="contained">
                        Неверно
                    </Button>
                    <Button className="button_right" variant="contained">
                        Верно
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default App;
