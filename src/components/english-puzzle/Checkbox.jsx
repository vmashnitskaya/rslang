import React from 'react';
import PropTypes from 'prop-types';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import TranslateIcon from '@material-ui/icons/Translate';
import './Checkbox.scss';

const Checkbox = ({ className, id, checked, onChange }) => {
    return (
        <>
            <input id={id} type="checkbox" checked={checked} onChange={onChange} />
            <label htmlFor={id} className={`checkbox-label ${className}`}>
                {id === 'auto' && <MusicNoteIcon />}
                {id === 'volume' && <VolumeUpIcon />}
                {id === 'translate' && <TranslateIcon />}
            </label>
        </>
    );
};

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;
