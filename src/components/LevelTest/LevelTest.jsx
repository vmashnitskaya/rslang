import React from 'react';
import { Box, Typography } from '@material-ui/core';
import QuestionForm from './questionForm';
import './styles.scss';

const LevelTest = () => {
    return (
        <Box className="test">
            <Typography className="test__header" align="center" variant="h4">
                Language Level Test
            </Typography>
            <Typography className="test__description">
                Test has 50 questions, each worth one point. The first 40 are grammar questions and
                the final 10 are vocabulary questions.
            </Typography>
            <QuestionForm />
        </Box>
    );
};

export default LevelTest;
