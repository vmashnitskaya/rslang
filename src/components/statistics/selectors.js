import statSelectors from '../router/storage/getPutStatisticsRedux/statisticsSelectors';
import statUtils from '../router/storage/getPutStatisticsRedux/statisticsUtils';

const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const weeklyAchivments = (state) => {
    const stats = statSelectors.getStatistics(state).optional.main;
    const arr = [];
    const firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - 8);
    for (let i = 0; i < 7; i += 1) {
        firstDay.setDate(firstDay.getDate() + 1);
        const key = statUtils.convertDate(firstDay);
        const value = stats[key] ? stats[key].d <= stats[key].l : false;
        arr.push({
            day: dayOfWeeks[firstDay.getDay()],
            value,
            today: i === 6,
        });
    }
    return arr;
};

const getDateFromKey = (key) => {
    let date = Date.now();
    if (key.length >= 8) {
        const year = key.slice(0, 4);
        const month = Number.parseInt(key.slice(4, 6), 10) - 1;
        const day = key.slice(6, 8);
        if (key.length === 12) {
            const hours = key.slice(8, 10);
            const minutes = key.slice(10, 12);
            date = new Date(year, month, day, hours, minutes);
        } else {
            date = new Date(year, month, day);
        }
    }
    return date;
};

const mainGameStats = (state) => {
    const { learnedWords } = statSelectors.getStatistics(state);
    const persent = ((learnedWords / 3600) * 100).toFixed(2);
    const stats = statSelectors.getStatistics(state).optional.main;
    let firstDate = Object.keys(stats)
        .map((e) => getDateFromKey(e))
        .sort((a, b) => a < b)[0];
    if (!firstDate) {
        firstDate = Date.now();
    }
    let daysToShow = Math.ceil((Date.now() - firstDate) / (24 * 3600 * 1000));
    if (daysToShow < 10) {
        daysToShow = 10;
    }
    const dates = [];
    for (let i = 0; i < daysToShow; i += 1) {
        const date = new Date(firstDate);
        date.setDate(firstDate.getDate() + i);
        dates.push(date);
    }
    const data = [];
    const toolTipsData = [];
    for (let i = 0; i < dates.length; i += 1) {
        const key = statUtils.convertDate(dates[i]);
        const el = stats[key];
        data.push(el ? el.l : 0);
        toolTipsData.push({
            wordPerDay: el ? el.d : toolTipsData[i - 1].wordPerDay,
            success: el ? el.s : 0,
            wrong: el ? el.e : 0,
            maxSequence: el ? el.msq : 0,
        });
    }
    return {
        dates: dates.map((e) => `${monthNames[e.getMonth()]} ${e.getDate()}`),
        data,
        toolTipsData,
        persent,
    };
};

const miniGameStats = (state) => {
    const stats = statSelectors.getStatistics(state).optional;
    const gamesArr = Object.keys(statUtils.miniGames).map((e) => ({
        name: statUtils.miniGames[e].name,
        alias: statUtils.miniGames[e].alias,
    }));
    const resultArr = gamesArr.map((e) => {
        const gameStats = stats[e.alias] ? stats[e.alias] : {};
        const games = Object.keys(gameStats)
            .map((e) => ({
                date: getDateFromKey(e),
                key: e,
            }))
            .sort((a, b) => a.date < b.date);
        const totalGames = games.length;
        let correct = 0;
        let wrong = 0;
        let totalWords = 0;
        if (games.length === 0) {
            return null;
        }
        const daysArr = [
            {
                date: games[0].date,
                totalGames: 0,
                totalWords: 0,
                correct: 0,
                wrong: 0,
                games: [],
            },
        ];
        for (let i = 0; i < games.length; i += 1) {
            const { key } = games[i];
            correct += gameStats[key].c;
            totalWords += gameStats[key].t;
            wrong += gameStats[key].t - gameStats[key].c;
            let day = daysArr[daysArr.length - 1];
            if (
                day.date.getDate() !== games[i].date.getDate() ||
                day.date.getMonth() !== games[i].date.getMonth()
            ) {
                day = {
                    date: games[i].date,
                    totalGames: 0,
                    totalWords: 0,
                    correct: 0,
                    wrong: 0,
                    games: [],
                };
                daysArr.push(day);
            }
            day.totalGames += 1;
            day.totalWords += gameStats[key].t;
            day.correct += gameStats[key].c;
            day.wrong += gameStats[key].t - gameStats[key].c;
            day.games.push({
                date: games[0].date,
                totalWords: gameStats[key].t,
                correct: gameStats[key].c,
                wrong: gameStats[key].t - gameStats[key].c,
            });
        }
        const rootObj = {
            name: e.name,
            totalGames,
            totalWords,
            correct,
            wrong,
            daysArr,
        };
        return rootObj;
    });
    return resultArr.filter((e) => e);
};

export default {
    weeklyAchivments,
    mainGameStats,
    miniGameStats,
};
