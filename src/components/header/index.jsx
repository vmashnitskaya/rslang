import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { pagePropType } from '../router/pages';
import './header.scss';

const Header = ({ pages }) => {
    const location = useLocation();
    return (
        <AppBar position="fixed" className="header">
            <Toolbar>
                <Typography variant="h6">RS Lang</Typography>
            </Toolbar>
            <nav>
                <ul className="header__links">
                    {pages.map((e) => {
                        const current = e.url === location.pathname;
                        return (
                            <li key={`li_${e.url}`}>
                                <Button>
                                    <Link
                                        style={{ color: current ? '#cfcfcf' : 'white' }}
                                        className="header__link"
                                        to={e.url}
                                    >
                                        {e.title}
                                    </Link>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </AppBar>
    );
};

Header.propTypes = {
    pages: PropTypes.arrayOf(pagePropType).isRequired,
};

export default Header;
