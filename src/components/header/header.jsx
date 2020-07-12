import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Sidebar from '../sidebar';
import { pagePropType } from '../router/pages';
import action from '../router/storage/actions';
import './header.scss';

const Header = ({ pages }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    return (
        <div>
            <AppBar position="fixed" className="header">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => {
                            setIsOpen(true);
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">RS Lang</Typography>
                </Toolbar>
                <nav className="header__nav">
                    <ul className="header__links">
                        <li className="header__log-out">
                            <Button color="inherit" onClick={() => action.user.logOut(dispatch)}>
                                Log Out
                            </Button>
                        </li>
                        <li>
                            <IconButton aria-label="account of current user" color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </li>
                    </ul>
                </nav>
            </AppBar>
            <Sidebar pages={pages} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

Header.propTypes = {
    pages: PropTypes.arrayOf(pagePropType).isRequired,
};

export default Header;
