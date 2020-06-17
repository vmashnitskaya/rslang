import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const WordRow = ({ word, translation, index, onButtonClick }) => {
    const onClick = () => {
        if (onButtonClick) onButtonClick(index);
    };

    return (
        <TableRow>
            <TableCell index={index} align="center">
                {word}
            </TableCell>
            <TableCell index={index} align="center">
                {translation}
            </TableCell>
            {onButtonClick && (
                <TableCell align="center">
                    <Button
                        className="restore-button"
                        variant="outlined"
                        color="primary"
                        onClick={onClick}
                    >
                        Restore
                    </Button>
                </TableCell>
            )}
        </TableRow>
    );
};

WordRow.propTypes = {
    word: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onButtonClick: PropTypes.func,
};

WordRow.defaultProps = {
    onButtonClick: undefined,
};

export default WordRow;
