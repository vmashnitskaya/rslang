import React from 'react';
import Carousel from 'nuka-carousel';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import * as txtx from './TextInformation';
import '../style.css';

const imgSlide = [
    'https://uggs.rkomi.ru/content/19342/No%20photo%201.png',
    'https://uggs.rkomi.ru/content/19342/No%20photo%201.png',
    'https://uggs.rkomi.ru/content/19342/No%20photo%201.png',
    'https://uggs.rkomi.ru/content/19342/No%20photo%201.png',
    'https://uggs.rkomi.ru/content/19342/No%20photo%201.png',
];

function createSlideUserCommemt() {
    const arrImg = [];
    for (let i = 0; i <= imgSlide.length - 1; i += 1) {
        const index = `${i}`;
        const prefix1 = 'ef0';

        const slide = (
            <div key={prefix1} className="grandChild">
                <img
                    key={prefix1 + index}
                    src={imgSlide[i]}
                    alt=""
                    className="slide"
                    width="400px"
                />
                <Paper>
                    <txtx.userComments />
                </Paper>
            </div>
        );
        arrImg.push(slide);
    }
    return (
        <div>
            <Typography className="slogan"> Что пользователи говорят о RSLang</Typography>
            <Carousel
                width="75%"
                height="36em"
                slideWidth={1}
                slidesToShow={3}
                slidesToScroll={1}
                wrapAround
            >
                {arrImg}
            </Carousel>
        </div>
    );
}

export default function CarouselUsersComments() {
    return createSlideUserCommemt();
}
