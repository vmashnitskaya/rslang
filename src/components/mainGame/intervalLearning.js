const day = (lastRepeating) => {
    return 2 * lastRepeating + 1;
};

const dateToString = (date) => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    return `${ye}.${mo}.${da}`;
};

const stringToDate = (str) => {
    const parts = str.split('.');
    return new Date(parts[0], parts[1], parts[2]);
};

const intervalLearning = (learningDates) => {
    const today = new Date();
    if (learningDates.length === 0) {
        today.setDate(today.getDate() + 1);
        return [today];
    }
    const nextDay = day(learningDates.length + 1);
    const lastDay = stringToDate(learningDates[learningDates.length - 1]);
    lastDay.setDate(today.getDate() + nextDay);
    return dateToString(lastDay);
};

export { intervalLearning, dateToString };
