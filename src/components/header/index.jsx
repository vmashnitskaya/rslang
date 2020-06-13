import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { pagePropType } from '../router/pages';

const Header = ({ pages }) => {
    const location = useLocation();
    return (
        <header>
            <nav>
                <ul>
                    {pages.map((e) => {
                        const current = e.url === location.pathname;
                        return (
                            <li key={`li_${e.url}`}>
                                <Link style={{ color: current ? 'black' : 'blue' }} to={e.url}>
                                    {e.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

Header.propTypes = {
    pages: PropTypes.arrayOf(pagePropType).isRequired,
};

export default Header;
