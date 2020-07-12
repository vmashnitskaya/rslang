import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    root: {
        fontSize: 16,
    },

    select: {
        fontSize: 16,
    },
}));

const DropDown = ({ className, name, label, value, options, onChange, isDropdownDisabled }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        onChange(event.target.value);
    };
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={name} className={classes.root}>
                {label}
            </InputLabel>
            <Select
                className={classes.select}
                labelId={name}
                value={value}
                onChange={handleChange}
                disabled={isDropdownDisabled}
            >
                {options.map((option) => {
                    return (
                        <MenuItem key={option.value} value={option.value} className={className}>
                            {option.text}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

DropDown.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
    isDropdownDisabled: PropTypes.bool.isRequired,
};

DropDown.defaultProps = {
    className: '',
};

export default DropDown;
