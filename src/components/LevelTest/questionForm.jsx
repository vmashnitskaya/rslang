import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import questions from './questions';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

export default function ErrorRadios() {
    const classes = useStyles();
    const [point, setPoint] = useState(0)
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (value === 'best') {
            setError(false);
        } else if (value === 'worst') {
            setError(true);
        } else {
            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>Languarge Level Test</Box>
            <Box>
                test has 50 questions, each worth one point. The first 40 are grammar questions and
                the final 10 are vocabulary questions.
            </Box>
            <FormControl component="fieldset" error={error} className={classes.formControl}>
                <FormLabel component="legend">{questions[0].question}</FormLabel>
                <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="best" control={<Radio />} label="Aaaaaa" />
                    <FormControlLabel value="worst" control={<Radio />} label="The worst." />
                    <FormControlLabel value="worst" control={<Radio />} label="The worst." />
                    <FormControlLabel value="worst" control={<Radio />} label="The worst." />
                </RadioGroup>
                <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                    End Test
                </Button>
            </FormControl>
        </form>
    );
}
