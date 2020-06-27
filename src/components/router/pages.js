import PropTypes from 'prop-types';
import MainPage from '../mainPage/index';
import AboutProject from '../aboutProject/index';
import AboutTeam from '../aboutTeam/index';
import Sprint from '../sprint/Sprint';

const pages = [
    {
        component: MainPage,
        title: 'Main Page',
        url: '/',
        img: '',
        exact: true,
    },
    {
        component: AboutProject,
        title: 'About Project',
        url: '/aboutproject',
        img: '/assets/images/angry.jpg',
        exact: true,
    },
    {
        component: AboutTeam,
        title: 'About Team',
        url: '/aboutteam',
        img: '/assets/images/scared.jpg',
        exact: true,
    },
    {
        component: Sprint,
        title: 'Sprint',
        url: '/sprint',
        img: '/assets/images/sprint.png',
        exact: false,
    },
];

export const pagePropType = PropTypes.exact({
    component: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
});

export default pages;
