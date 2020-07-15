import PropTypes from 'prop-types';
import MainPage from '../mainPage/index';
import AboutProject from '../aboutProject/index';
import AboutTeam from '../aboutTeam/index';
import Sprint from '../sprint/Sprint';
import SpeakItGame from '../speakIt/index';
import Vocabulary from '../vocabulary';
import Audition from '../audition';
import SavannahGame from '../savannah';
import MainGame from '../mainGame/index';
import EnglishPuzzle from '../english-puzzle';
import SettingsPage from '../settingsPage';
import AnagrammGame from '../anagrammGame';

const pages = [
    {
        component: MainPage,
        url: '/',
        exact: true,
        img: '',
        userMenuPage: false,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: MainGame,
        url: '/learn',
        exact: false,
        img: '/assets/images/maingame-card.jpg',
        userMenuPage: false,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: Vocabulary,
        url: '/vocabulary',
        exact: false,
        img: '/assets/images/scared.jpg',
        userMenuPage: true,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: Sprint,
        url: '/sprint',
        img: '/assets/images/sprint-card.jpg',
        exact: false,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: SpeakItGame,
        url: '/speakit',
        img: '/assets/images/speakit-card.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: EnglishPuzzle,
        url: '/englishpuzzle',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        img: '/assets/images/puzzle-card.jpg',
    },
    {
        component: Audition,
        url: '/audition',
        img: '/assets/images/audition-card.jpg',
    },
    {
        component: SavannahGame,
        url: '/Savannah',
        img: '/assets/images/savannah-card.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: SettingsPage,
        url: '/settings',
        img: '/assets/images/angry.jpg',
        exact: true,
        userMenuPage: true,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: AnagrammGame,
        url: '/anagramm',
        exact: true,
        img: '/assets/images/anagramm-card.jpg',
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: AboutProject,
        url: '/aboutproject',
        exact: true,
        img: '/assets/images/angry.jpg',
        userMenuPage: false,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: AboutTeam,
        url: '/aboutteam',
        img: '/assets/images/happy.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: false,
        description: '',
    },
];

export const pagePropType = PropTypes.exact({
    component: PropTypes.elementType.isRequired,
    url: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
    img: PropTypes.string.isRequired,
    userMenuPage: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired,
    minigame: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
});

export default pages;
