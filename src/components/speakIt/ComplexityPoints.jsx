import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import './ComplexityPoints.scss';

const ComplexityPoints = ({ complexityArray, onComplexityChange }) => {
    const [value, setValue] = useState(0);
    const handleChange = (event) => {
        setValue(Number(event.target.value));
        onComplexityChange(Number(event.target.value));
    };
    return (
        <RadioGroup
            component="fieldset"
            onChange={handleChange}
            value={value}
            row
            classes={{
                row: 'complexity-points',
            }}
        >
            {complexityArray.map((complexity) => (
                <FormControlLabel
                    value={complexity}
                    className="point"
                    control={<Radio color="primary" />}
                />
            ))}
        </RadioGroup>
    );
};

ComplexityPoints.propTypes = {
    complexityArray: PropTypes.arrayOf(PropTypes.number).isRequired,
    onComplexityChange: PropTypes.func.isRequired,
};

export default ComplexityPoints;
