import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper, Link } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import TelegramIcon from '@material-ui/icons/Telegram';
import Header from './Header';
import CarouselScreenshots from './CarouselScreens';
import * as txtx from './TextInformation';
import CarouselUserComments from './userComment';

export default function AboutProject() {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <txtx.firstDescrib />
            </Grid>
            <Grid item xs={12}>
                <CarouselScreenshots />
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <txtx.secondDescrib />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CarouselUserComments />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper>
                        <Link
                            href={`mailto:"nataredred@gmail.com"}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <EmailIcon fontSize="small" />
                            E-mail
                        </Link>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Link href="https://t.me/RssLang" target="_blank" rel="noreferrer">
                            <TelegramIcon fontSize="small" />
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
