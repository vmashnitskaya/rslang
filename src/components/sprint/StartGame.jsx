import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function StartGame({ onClose }) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        onClose();
        setOpen(false);
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        />
                        <Typography variant="h6" className={classes.title}>
                            Rules
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box>
                    <ComplexityPoints
                        currentComplexity={complexity}
                        onComplexityChange={handleComplexityChange}
                        complexityArray={[0, 1, 2, 3, 4, 5]}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleClose}>
                    Start Game
                </Button>
            </Dialog>
        </div>
    );
}

StartGame.propTypes = {
    onClose: PropTypes.func.isRequired,
};
