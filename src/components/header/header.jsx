import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './header.scss';

const Header = () => (
    <AppBar position="fixed" className="header">
        <Toolbar>
            <Typography variant="h6">RS Lang</Typography>
        </Toolbar>
        <nav className="header__nav">
            <ul className="header__links">
                <li>
                    <IconButton aria-label="account of current user" color="inherit">
                        <AccountCircle />
                    </IconButton>
                </li>
            </ul>
        </nav>
    </AppBar>
);

export default Header;
