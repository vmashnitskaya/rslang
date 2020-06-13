import PropTypes from 'prop-types';
import MainPage from '../mainPage/index';
import AboutProject from '../aboutProject/index';
import AboutTeam from '../aboutTeam/index';

const pages = [
    {
        component: MainPage,
        title: 'Main Page',
        url: '/',
        root: true,
    },
    {
        component: AboutProject,
        title: 'About Project',
        url: '/aboutproject',
    },
    {
        component: AboutTeam,
        title: 'About Team',
        url: '/aboutteam',
    },
];

export const pagePropType = PropTypes.exact({
    component: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    root: PropTypes.bool,
});

export default pages;
