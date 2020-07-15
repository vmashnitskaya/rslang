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
import LevelTest from '../LevelTest/LevelTest';

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
        img: '/assets/images/vocabulary.png',
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
        description: 'Determine if the word and translation match in 1 minute.',
    },
    {
        component: SpeakItGame,
        url: '/speakit',
        img: '/assets/images/speakit-card.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Training of pronunciation words correctly. Images and examples are provided.',
    },
    {
        component: EnglishPuzzle,
        url: '/englishpuzzle',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        img: '/assets/images/puzzle-card.jpg',
        description: 'Create sentences with words. Additional hints can be used for help.',
    },
    {
        component: Audition,
        url: '/audition',
        img: '/assets/images/audition-card.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
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
        img: '/assets/images/settings.png',
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
    {
        component: LevelTest,
        title: 'Level Test',
        url: '/levelTest',
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
