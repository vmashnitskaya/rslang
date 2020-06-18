import PropTypes from 'prop-types';
import MainPage from '../mainPage/index';
import AboutProject from '../aboutProject/index';
import AboutTeam from '../aboutTeam/index';
import SpeakItGame from '../speakIt';

const pages = [
    {
        component: MainPage,
        title: 'Main Page',
        url: '/',
        img: '',
    },
    {
        component: AboutProject,
        title: 'About Project',
        url: '/aboutproject',
        img: '/assets/images/angry.jpg',
    },
    {
        component: AboutTeam,
        title: 'About Team',
        url: '/aboutteam',
        img: '/assets/images/scared.jpg',
    },
    {
        component: SpeakItGame,
        title: 'SpeakIt',
        url: '/speakit',
        img: '/assets/images/scared.jpg',
        exact: true,
    },
];

export const pagePropType = PropTypes.exact({
    component: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
});

export default pages;
