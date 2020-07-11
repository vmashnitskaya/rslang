import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const PopUp = ({ isPopUpOpen, onPopUpClose, title, text }) => {
    const handleClose = () => onPopUpClose();
    return (
        <Dialog fullScreen={false} open={isPopUpOpen} onClose={handleClose}>
            <DialogTitle id="draggable-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus fullWidth data-agree="ok" onClick={handleClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PopUp.propTypes = {
    isPopUpOpen: PropTypes.bool,
    onPopUpClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

PopUp.defaultProps = {
    isPopUpOpen: false,
};

export default PopUp;
