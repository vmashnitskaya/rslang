import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import questions from './questions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

export default function QuestionForm() {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    // const [point, setPoint] = useState(0);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (value === questions[0].correctAnswer) {
            setError(false);
            // setPoint(1);
        } else if (value === 'worst') {
            setError(true);
        } else {
            setError(true);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={error} className={classes.formControl}>
                <FormLabel component="legend">{questions[0].question}</FormLabel>
                <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="Aaaaaa" control={<Radio />} label="Aaaaaa" />
                    <FormControlLabel value="worst" control={<Radio />} label="The worst." />
                    <FormControlLabel value="worst" control={<Radio />} label="The worst." />
                    <FormControlLabel value="worst" control={<Radio />} label="The worst." />
                    <br />
                </RadioGroup>
                <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                    End Test
                </Button>
            </FormControl>
        </form>
    );
}
