import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../sidebar';
import { pagePropType } from '../router/pages';
import './header.scss';
import HeaderMenu from './headerMenu';

const Header = ({ pages, auth }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [isLoginPages, setIsLoginPages] = useState(
        location.pathname === '/' || location.pathname === '/sign-up'
    );
    useEffect(() => {
        setIsLoginPages(location.pathname === '/' || location.pathname === '/sign-up');
    }, [location]);

    let control = null;
    if (auth) {
        control = <HeaderMenu pages={pages} />;
    } else if (!isLoginPages) {
        control = (
            <div className="btn">
                <Button variant="contained" color="secondary">
                    <Link to="/">Sign in</Link>
                </Button>
            </div>
        );
    }

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
                {control}
            </AppBar>
            <Sidebar pages={pages} isOpen={isOpen} setIsOpen={setIsOpen} auth={auth} />
        </div>
    );
};

Header.propTypes = {
    pages: PropTypes.arrayOf(pagePropType).isRequired,
    auth: PropTypes.bool.isRequired,
};
export default Header;
