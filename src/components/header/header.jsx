import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar';
import { pagePropType } from '../router/pages';
import './header.scss';

const Header = ({ pages }) => {
    const [isOpen, setNewPositionOfSidebar] = useState(true);
    const closeSidebar = () => {
        setNewPositionOfSidebar(false);
    };
    return (
        <div>
            <AppBar position="fixed" className="header">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        // onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
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
            <Sidebar pages={pages} isOpen={isOpen} closeSidebar={closeSidebar} />
        </div>
    );
};

Header.propTypes = {
    pages: PropTypes.arrayOf(pagePropType).isRequired,
};

export default Header;
