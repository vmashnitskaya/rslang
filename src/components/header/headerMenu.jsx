import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IconButton, ListItemIcon, ListItemText, MenuItem, Menu } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import action from '../router/storage/actions';
import { pagePropType } from '../router/pages';

const iconObj = {
    Vocabulary: <ImportContactsTwoToneIcon />,
    Settings: <SettingsOutlinedIcon />,
    Statistics: <TrendingUpOutlinedIcon />,
    LogOut: <MeetingRoomRoundedIcon />,
};
const menuIcon = (text) => {
    return iconObj[text];
};

const HeaderMenu = ({ pages }) => {
    const history = useHistory();
    const [isMenuOpen, setIsMenuOpen] = useState(null);
    const menuClose = () => {
        setIsMenuOpen(null);
    };
    const menuOpen = (event) => {
        setIsMenuOpen(event.currentTarget);
    };
    const dispatch = useDispatch();
    const logOutFunc = () => {
        history.push('/');
        action.user.logOut(dispatch);
    };

    const menuPages = pages
        .filter((p) => p.userMenuPage)
        .map((p) => (
            <MenuItem key={`usr_menu_${p.url}`}>
                <Link to={p.url} onClick={menuClose} className="header__menu">
                    <ListItemIcon>{menuIcon(p.title)}</ListItemIcon>
                    <ListItemText primary={p.title} />
                </Link>
            </MenuItem>
        ));
    menuPages.push(
        <MenuItem key="usr_menu_logout" className="header__menu">
            <ListItemIcon>{menuIcon('LogOut')}</ListItemIcon>
            <ListItemText primary="Log Out" onClick={logOutFunc} />
        </MenuItem>
    );

    return (
        <>
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
                id="header-menu"
                anchorEl={isMenuOpen}
                open={Boolean(isMenuOpen)}
                onClose={menuClose}
                keepMounted
            >
                {menuPages}
            </Menu>
        </>
    );
};

HeaderMenu.propTypes = {
    pages: PropTypes.arrayOf(pagePropType).isRequired,
};

export default HeaderMenu;
