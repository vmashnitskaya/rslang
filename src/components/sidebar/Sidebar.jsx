import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { pagePropType } from '../router/pages';

const sidebarWidth = 240;

const styles = makeStyles(() => ({
    sidebar: {
        width: sidebarWidth,
        flexShrink: 0,
    },
    sidebarPaper: {
        width: sidebarWidth,
    },
}));

const Sidebar = ({ pages }) => {
    const location = useLocation();
    const classes = styles();
    const [isOpen, setNewPositionOfSidebar] = useState(false);
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            className={classes.sidebar}
            classes={{
                paper: classes.sidebarPaper,
            }}
            open={isOpen}
        >
            <div>
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {pages.map((link) => {
                    const current = link.url === location.pathname;
                    return (
                        <Link
                            style={{
                                color: current ? '#828282' : '#202020',
                                textDecoration: 'none',
                            }}
                            to={link.url}
                            key={link.title}
                        >
                            <ListItem button>
                                <ListItemText primary={link.title} />
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </Drawer>
    );
};

Sidebar.propTypes = {
    pages: PropTypes.arrayOf(pagePropType).isRequired,
};

export default Sidebar;
