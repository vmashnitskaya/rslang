import React from 'react';
import { Typography } from '@material-ui/core';

const txt = [
    'RSLang - онлайн - сервис для изучения и практики английского языка которым пользуются по всему миру',
    'Начните обучение с RSLang! RSLang позволяет изучать слова быстрее и эффективнее. Начните прямо сейчас и максимально увеличьте свой словарный запас.',
    'Работа приложения основана на методе интервального повторения. Суть метода состоит в том, что информация повторяется через определенные промежутки времени, все возрастающиепромежутки времени.Например, вы хотите выучить новое иностранное слово.Первый раз вы должны повторить это слово через пару минут, потом через час, далее - на следующи день, nзатем через 2 дня, 5 дней, 10 дней, 3 недели, 6 недель, 3 месяца, 6 месяцев и т.д. И вуаля: вы на всю жизнь запомните это слово.',
    '&#171; Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&#187;',
];

function slogan() {
    return <Typography>{txt[0]}</Typography>;
}

function firstDescrib() {
    return <Typography>{txt[1]}</Typography>;
}

function secondDescrib() {
    return <Typography>{txt[2]} </Typography>;
}

function userComments() {
    return <Typography>{txt[3]}</Typography>;
}

export { firstDescrib, secondDescrib, userComments, slogan };
