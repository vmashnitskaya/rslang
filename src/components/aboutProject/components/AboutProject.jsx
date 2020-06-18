import React from 'react';
import { Typography, Link, Button } from '@material-ui/core';
import ReactPlayer from 'react-player/youtube';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Carousel from 'nuka-carousel';
import useStyles from './data';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function AboutProject() {
    const classes = useStyles();
    return (
        <div className={classes.aboutProject}>
            <Grid container spacing={1} className={classes.slogan}>
                <Grid item xs={3}>
                    Logo
                </Grid>
                <Grid item xs={3}>
                    <Button className={classes.button}>
                        <Link href="page">Начать</Link>
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button className={classes.button}>
                        <Link href="page">Войти</Link>
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button className={classes.button}>
                        <Link href="page">Связаться с нами</Link>
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={classes.slogan}>
                        <h1>
                            RSLang - онлайн-сервис для изучения и практики английского языка,
                            которым пользуются по всему миру!
                        </h1>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ReactPlayer
                        style={{ className: classes.slogan }}
                        url="https://www.youtube.com/embed/5woDAZ9Pjw8"
                        controls
                        width="100%"
                        hight="60%"
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.slogan}>
                    <h1>Начните обучение с RSLang</h1>
                    <p> RSLang позволяет изучать слова быстрее</p>
                    <p>и эффективнее. Начните прямо сейчас и максимально</p>
                    <p>увеличьте свой словарный запас.</p>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Carousel
                    style={{ className: classes.slide }}
                    autoplay
                    width="100%"
                    height="350px"
                    slideWidth={0.4}
                    slidesToShow={1}
                    slidesToScroll={1}
                    wrapAround
                    autoplayReverse
                    autoplayInterval={5000}
                >
                    <img
                        src="https://u.kanobu.ru/screenshots/880b6359-06ae-4a42-a8a5-6ae71bf026ac.jpg"
                        alt=""
                    />
                    <img
                        src="https://u.kanobu.ru/screenshots/880b6359-06ae-4a42-a8a5-6ae71bf026ac.jpg"
                        alt=""
                    />
                    <img
                        src="https://u.kanobu.ru/screenshots/880b6359-06ae-4a42-a8a5-6ae71bf026ac.jpg"
                        alt=""
                    />
                    <img
                        src="https://u.kanobu.ru/screenshots/880b6359-06ae-4a42-a8a5-6ae71bf026ac.jpg"
                        alt=""
                    />
                    <img
                        src="https://u.kanobu.ru/screenshots/880b6359-06ae-4a42-a8a5-6ae71bf026ac.jpg"
                        alt=""
                    />
                    <img
                        src="https://u.kanobu.ru/screenshots/880b6359-06ae-4a42-a8a5-6ae71bf026ac.jpg"
                        alt=""
                    />
                </Carousel>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Grid item xs={12} className={classes.slogan}>
                        Работа приложения основана на методе интервального повторения. Суть метода
                        состоит в том, что информация повторяется через определенные промежутки
                        времени, все возрастающие промежутки времени. Например, выхотите выучить
                        новое иностранное слово. Первый раз вы должны повторить это слово через пару
                        минут, потом через час, далее - на следующий день, затем через 2 дня, 5
                        дней, 10 дней, 3 недели, 6 недель, 3 месяца, 6 месяцев и т.д. И вуаля: вы на
                        всю жизнь запомните это слово.
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.slogan}>
                    <h1>Что пользователи говорят о RSLang</h1>
                </Typography>
            </Grid>
            <Grid container spacing={0.2}>
                <Grid item xs={12}>
                    <Carousel
                        style={{ className: classes.slide }}
                        width="100%"
                        slideWidth={0.5}
                        slidesToShow={2}
                        slidesToScroll={1}
                        wrapAround
                        autoplayInterval={5000}
                    >
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <CardMedia
                                    component="img"
                                    image="https://uggs.rkomi.ru/content/19342/No%20photo%201.png"
                                />
                                <Paper>
                                    <Grid item xs={12}>
                                        &#171; Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit,sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.&#187;
                                    </Grid>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <CardMedia
                                    component="img"
                                    image="https://uggs.rkomi.ru/content/19342/No%20photo%201.png"
                                />
                                <Paper>
                                    <Grid item xs={12}>
                                        &#171; Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit,sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua. &#187;
                                    </Grid>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <CardMedia
                                    component="img"
                                    image="https://uggs.rkomi.ru/content/19342/No%20photo%201.png"
                                />
                                <Paper>
                                    <Grid item xs={12}>
                                        &#171; Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit,sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.&#187;
                                    </Grid>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <CardMedia
                                    component="img"
                                    image="https://uggs.rkomi.ru/content/19342/No%20photo%201.png"
                                />
                                <Paper>
                                    <Grid item xs={12}>
                                        &#171; Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit,sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.&#187;
                                    </Grid>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <CardMedia
                                    component="img"
                                    image="https://uggs.rkomi.ru/content/19342/No%20photo%201.png"
                                />
                                <Paper>
                                    <Grid item xs={12}>
                                        &#171; Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit,sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.&#187;
                                    </Grid>
                                </Paper>
                            </Paper>
                        </Grid>
                    </Carousel>
                </Grid>
            </Grid>
        </div>
    );
}
