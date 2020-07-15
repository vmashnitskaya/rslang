import React from 'react';
import { Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player/youtube';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '18px',
        [theme.breakpoints.down('md')]: {
            fontSize: '16px',
        },
    },
}));

const AboutUsSection = () => {
    const classes = useStyles();
    return (
        <section className="about-us-part">
            <Typography align="center" color="primary" variant="h5">
                Why should you choose RS Lang?
            </Typography>
            <div className="about-us-points">
                <ul className="points">
                    <li>
                        <Typography color="textSecondary" className={classes.root}>
                            <CheckIcon color="primary" /> Words learning goes together with{' '}
                            <Typography variant="inherit" color="primary">
                                mini games
                            </Typography>{' '}
                            which significantly changes usual learning process.
                        </Typography>
                    </li>
                    <li>
                        <Typography color="textSecondary" className={classes.root}>
                            <CheckIcon color="primary" />{' '}
                            <Typography variant="inherit" color="primary">
                                Interval training
                            </Typography>{' '}
                            allows you to repeat already learned words and constantly maintain your
                            vocabulary.
                        </Typography>
                    </li>
                    <li>
                        <Typography color="textSecondary" className={classes.root}>
                            <CheckIcon color="primary" />{' '}
                            <Typography variant="inherit" color="primary">
                                Settings
                            </Typography>{' '}
                            will allow you to custom your learning process. You can choose how many
                            words you would like to learn to learn for a day, which type of
                            memorization you prefer(with pictures, audio, text).
                        </Typography>
                    </li>
                    <li>
                        <Typography color="textSecondary" className={classes.root}>
                            <CheckIcon color="primary" /> You can review you{' '}
                            <Typography variant="inherit" color="primary">
                                vocabulary
                            </Typography>{' '}
                            of Learned, Difficult, Easy & Deleted words at any time and repeat
                            learned words.
                        </Typography>
                    </li>
                    <li>
                        <Typography color="textSecondary" className={classes.root}>
                            <CheckIcon color="primary" />{' '}
                            <Typography variant="inherit" color="primary">
                                Statistics
                            </Typography>{' '}
                            page will allow you to review you progress in words lerning and mini
                            games.
                        </Typography>
                    </li>
                </ul>
                <div className="video">
                    <Typography
                        color="textSecondary"
                        align="center"
                        gutterBottom
                        className={classes.root}
                    >
                        Have not decided yet? Check the training process in video
                    </Typography>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=O33tSc8FZUg&"
                        controls
                        width="100%"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
