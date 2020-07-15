import PropTypes from 'prop-types';
import MainPage from '../mainPage';
import AboutProject from '../aboutProject';
import AboutTeam from '../aboutTeam';
import Sprint from '../sprint/Sprint';
import SpeakItGame from '../speakIt';
import Vocabulary from '../vocabulary';
import Audition from '../audition';
import SavannahGame from '../savannah';
import MainGame from '../mainGame';
import EnglishPuzzle from '../english-puzzle';
import SettingsPage from '../settingsPage';
import AnagrammGame from '../anagrammGame';
import Statistics from '../statistics';
import LevelTest from '../LevelTest/LevelTest';

const pages = [
    {
        component: MainPage,
        url: '/',
        exact: true,
        img: '',
        userMenuPage: false,
        mainPage: false,
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
        mainPage: true,
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
        mainPage: false,
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
        mainPage: true,
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
        mainPage: true,
        auth: false,
        minigame: true,
        description: 'Training of pronunciation words correctly. Images and examples are provided.',
    },
    {
        component: EnglishPuzzle,
        title: 'English Puzzle',
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
        mainPage: true,
        auth: false,
        minigame: true,
        description:
            'During the game, the word in English will be pronounced, you need to select its translation.',
    },
    {
        component: SavannahGame,
        url: '/Savannah',
        img: '/assets/images/savannah-card.jpg',
        exact: true,
        userMenuPage: false,
        mainPage: true,
        auth: false,
        minigame: true,
        description:
            'This is a simulator for translating your passive learned dictionary into the active stage.',
    },
    {
        component: SettingsPage,
        url: '/settings',
        img: '/assets/images/settings.png',
        exact: true,
        userMenuPage: true,
        mainPage: false,
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
        mainPage: true,
        auth: false,
        minigame: true,
        description: 'Choose the difficulty level of the game and make words from mixed letters.',
    },
    {
        component: AboutProject,
        url: '/aboutproject',
        exact: true,
        img: '/assets/images/angry.jpg',
        userMenuPage: false,
        mainPage: false,
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
        mainPage: false,
        auth: false,
        minigame: false,
        description: '',
    },
    {
        component: Statistics,
        title: 'Statistics',
        url: '/statistics',
        img: '/assets/images/happy.jpg',
        exact: false,
        userMenuPage: true,
        mainPage: false,
        auth: true,
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
        mainPage: false,
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
    mainPage: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired,
    minigame: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
});

export default pages;
