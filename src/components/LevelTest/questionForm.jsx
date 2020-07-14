import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import EndGame from './EndGame';
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
    const [fieldsValues, setFieldsValues] = useState({});
    const [end, setEnd] = useState(false);
    const [score, setScore] = useState(0);

    const handleRadioChange = (event, id, correct) => {
        const newFields = { ...fieldsValues, [id]: { current: event.target.value, correct } };
        setFieldsValues(newFields);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newScore = Object.entries(fieldsValues).filter(
            (entry) => entry[1].current === entry[1].correct
        ).length;
        setScore(newScore);
        setEnd(true);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box className="form">
                    {questions.map((q) => (
                        <FormControl
                            component="fieldset"
                            className={classes.formControl}
                            key={JSON.stringify(q)}
                        >
                            <FormLabel component="legend">{q.question}</FormLabel>
                            <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                onChange={(e) =>
                                    handleRadioChange(e, JSON.stringify(q), q.correctAnswer)
                                }
                            >
                                <FormControlLabel
                                    value={q.answers[0]}
                                    control={<Radio />}
                                    label={q.answers[0]}
                                />
                                <FormControlLabel
                                    value={q.answers[1]}
                                    control={<Radio />}
                                    label={q.answers[1]}
                                />
                                <FormControlLabel
                                    value={q.answers[2]}
                                    control={<Radio />}
                                    label={q.answers[2]}
                                />
                                <FormControlLabel
                                    value={q.answers[3]}
                                    control={<Radio />}
                                    label={q.answers[3]}
                                />
                                <br />
                            </RadioGroup>
                        </FormControl>
                    ))}
                    <Button type="submit" variant="contained" color="primary">
                        End Test
                    </Button>
                </Box>
            </form>
            {end && <EndGame score={score} open={end} setOpen={setEnd} />}
        </Box>
    );
}
