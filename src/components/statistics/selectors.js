import statSelectors from '../router/storage/getPutStatisticsRedux/statisticsSelectors';
import statActions from '../router/storage/getPutStatisticsRedux/statisticsActions';

const dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const weeklyAchivments = (state) => {
    const stats = statSelectors.getStatistics(state);
    const mainGameStats = stats.optional.main;
    const arr = [];
    const firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - 7);
    for (let i = 0; i < 7; i += 1) {
        firstDay.setDate(firstDay.getDate() + 1);
        const key = statActions.convertDate(firstDay);
        const value = mainGameStats[key] ? mainGameStats[key].d <= mainGameStats[key].l : false;
        arr.push({
            day: dayOfWeeks[firstDay.getDay()],
            value,
        });
    }
    return arr;
};

export default {
    weeklyAchivments,
};
