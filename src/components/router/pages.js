import PropTypes from 'prop-types';
import MainPage from '../mainPage/index';
import AboutProject from '../aboutProject/index';
import AboutTeam from '../aboutTeam/index';
import Vocabulary from '../vocabulary';

const pages = [
    {
        component: MainPage,
        title: 'Main Page',
        url: '/',
        exact: true,
        img: '',
    },
    {
        component: AboutProject,
        title: 'About Project',
        url: '/aboutproject',
        exact: true,
        img: '/assets/images/angry.jpg',
    },
    {
        component: AboutTeam,
        title: 'About Team',
        url: '/aboutteam',
        exact: true,
    },
    {
        component: Vocabulary,
        title: 'Vocabulary',
        url: '/vocabulary',
        exact: false,
        img: '/assets/images/scared.jpg',
    },
];

export const pagePropType = PropTypes.exact({
    component: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
    img: PropTypes.string.isRequired,
});

export default pages;
