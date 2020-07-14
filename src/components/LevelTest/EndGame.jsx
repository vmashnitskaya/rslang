import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EndGame({ score, open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };
    let message = '';
    if (score >= 0 || score <= 15) {
        message = `Your result ${score}/50 You have an Beginner Level. You should start our app from teh beginnig.`;
    }
    if (score >= 16 || score <= 24) {
        message = `Your result ${score}/50 You have an Elementary Level. Second level of difficalty would be perfect for you.`;
    }
    if (score >= 25 || score <= 32) {
        message = `Your result ${score}/50 You have an Pre-Intermediate Level. Second and third levels of difficalty would be perfect for you.`;
    }
    if (score >= 33 || score <= 39) {
        message = `Your result ${score}/50 You have an Intermediate Level. Third and fourth levels of difficalty would be perfect for you.`;
    }
    if (score >= 40 || score <= 45) {
        message = `Your result ${score}/50 You have an Upper Intermediate Level. Fourth and fifth levels of difficalty would be perfect for you.`;
    }
    if (score >= 46 || score <= 50) {
        message = `Your result ${score}/50 You have an Advaced Level. Wow it's great. Just enjoy our app.`;
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Your Test Result</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

EndGame.propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired,
};
