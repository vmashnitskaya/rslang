import React from 'react';
import { Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ReactPlayer from 'react-player/youtube';

const AboutUsSection = () => {
    return (
        <section className="about-us-part">
            <Typography align="center" color="primary" variant="h5">
                Why should you choose RS Lang?
            </Typography>
            <div className="about-us-points">
                <ul className="points">
                    <li>
                        <Typography color="textSecondary">
                            <CheckIcon color="primary" /> Words learning goes together with{' '}
                            <Typography variant="span" color="primary">
                                mini games
                            </Typography>{' '}
                            which significantly changes usual learning process.
                        </Typography>
                    </li>
                    <li>
                        <Typography color="textSecondary">
                            <CheckIcon color="primary" />{' '}
                            <Typography variant="span" color="primary">
                                Interval training
                            </Typography>{' '}
                            allows you to repeat already learned words and constantly maintain your
                            vocabulary.
                        </Typography>
                    </li>
                    <li>
                        <Typography color="textSecondary">
                            <CheckIcon color="primary" />{' '}
                            <Typography variant="span" color="primary">
                                Settings
                            </Typography>{' '}
                            will allow you to custom your learning process. You can choose how many
                            words you would like to learn to learn for a day, which type of
                            memorization you prefer(with pictures, audio, text).
                        </Typography>
                    </li>
                    <li>
                        <Typography color="textSecondary">
                            <CheckIcon color="primary" /> You can review you{' '}
                            <Typography variant="span" color="primary">
                                vocabulary
                            </Typography>{' '}
                            of Learned, Difficult, Easy & Deleted words at any time and repeat
                            learned words.
                        </Typography>
                    </li>
                    <li>
                        <Typography color="textSecondary">
                            <CheckIcon color="primary" />{' '}
                            <Typography variant="span" color="primary">
                                Statistics
                            </Typography>{' '}
                            page will allow you to review you progress in words lerning and mini
                            games.
                        </Typography>
                    </li>
                </ul>
                <div className="video">
                    <Typography color="textSecondary" align="center" gutterBottom>
                        Have not decided yet? Check the training process in video
                    </Typography>
                    <ReactPlayer
                        url="https://www.youtube.com/embed/5woDAZ9Pjw8"
                        controls
                        width="120%"
                        height="60%"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
