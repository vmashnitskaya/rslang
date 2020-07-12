import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import Sidebar from '../sidebar';
import { pagePropType } from '../router/pages';
import action from '../router/storage/actions';
import './header.scss';

const HeaderMenu = (props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    />
);
const iconObj = {
    vocabulary: <ImportContactsTwoToneIcon />,
    settings: <SettingsOutlinedIcon />,
    statistics: <TrendingUpOutlinedIcon />,
    logOut: <MeetingRoomRoundedIcon />,
};
const menuIcon = (text) => {
    return iconObj[text];
};

const HeaderMenuItem = ({ menuClose, text, logOut }) => {
    const path = `/${text}`;
    if (text === 'Log Out') {
        return (
            <MenuItem className="header__menu">
                <ListItemIcon>{menuIcon('logOut')}</ListItemIcon>
                <ListItemText primary={text} onClick={logOut} />
            </MenuItem>
        );
    }
    return (
        <MenuItem>
            <Link to={path} onClick={menuClose} className="header__menu">
                <ListItemIcon>{menuIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
            </Link>
        </MenuItem>
    );
};

const Header = ({ pages }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const logOutFunc = () => {
        action.user.logOut(dispatch);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(null);
    const menuClose = () => {
        setIsMenuOpen(null);
    };
    const menuOpen = (event) => {
        setIsMenuOpen(event.currentTarget);
    };

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
                        <li>
                            <IconButton
                                aria-controls="header-menu"
                                aria-label="account of current user"
                                color="inherit"
                                onClick={menuOpen}
                            >
                                <AccountCircle />
                            </IconButton>
                        </li>
                    </ul>
                </nav>
            </AppBar>
            <Sidebar pages={pages} isOpen={isOpen} setIsOpen={setIsOpen} />
            <HeaderMenu
                id="header-menu"
                anchorEl={isMenuOpen}
                open={Boolean(isMenuOpen)}
                onClose={menuClose}
                keepMounted
            >
                <HeaderMenuItem menuClose={menuClose} text="vocabulary" />
                <HeaderMenuItem menuClose={menuClose} text="statistics" />
                <HeaderMenuItem menuClose={menuClose} text="settings" />
                <HeaderMenuItem menuClose={menuClose} text="Log Out" logOut={logOutFunc} />
            </HeaderMenu>
        </div>
    );
};

Header.propTypes = {
    pages: PropTypes.arrayOf(pagePropType).isRequired,
};
HeaderMenuItem.propTypes = {
    menuClose: PropTypes.objectOf(PropTypes.bool).isRequired,
    text: PropTypes.string.isRequired,
    logOut: PropTypes.func.isRequired,
};

export default Header;
