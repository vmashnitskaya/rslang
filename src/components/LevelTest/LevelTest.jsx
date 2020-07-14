import React from 'react';
import { Box, Typography } from '@material-ui/core';
import QuestionForm from './questionForm';
import './styles.scss';

const LevelTest = () => {
    return (
        <Box className="test">
            <Typography className="test__header" variant="h4">
                Languarge Level Test
            </Typography>
            <Typography className="test_description">
                Test has 50 questions, each worth one point. The first 40 are grammar questions and
                the final 10 are vocabulary questions.
            </Typography>
            <Box>
                <QuestionForm />
            </Box>
        </Box>
    );
};

export default LevelTest;
