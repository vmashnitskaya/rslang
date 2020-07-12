import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const PopUp = ({ currentIndex, onPopUpClose, onPopUpConfirm }) => {
    const handleClose = () => onPopUpClose();
    const handleConfirm = () => onPopUpConfirm();
    return (
        <Dialog fullScreen={false} open={currentIndex !== null} onClose={handleClose}>
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Restore
            </DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to restore the word?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus data-agree="no" onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleConfirm} data-agree="yes" color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PopUp.propTypes = {
    currentIndex: PropTypes.shape({
        id: PropTypes.string,
        word: PropTypes.string,
        audio: PropTypes.string,
        image: PropTypes.string,
        transcription: PropTypes.string,
        wordTranslate: PropTypes.string,
        userWord: PropTypes.shape({
            difficulty: PropTypes.string,
            optional: PropTypes.shape({
                learned: PropTypes.bool,
                difficult: PropTypes.bool,
                deleted: PropTypes.bool,
                repeat: PropTypes.bool,
            }),
        }),
    }),
    onPopUpClose: PropTypes.func.isRequired,
    onPopUpConfirm: PropTypes.func.isRequired,
};

PopUp.defaultProps = {
    currentIndex: null,
};

export default PopUp;
