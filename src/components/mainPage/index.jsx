import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Paper } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom';
import { getToken } from '../router/storage/selectors';

import statisticsSelectors from '../router/storage/getPutStatisticsRedux/statisticsSelectors';

const useStyles = makeStyles(() => ({
    media: {
        height: 140,
    },
}));

const MainPage = ({ routes, token }) => {
    const classes = useStyles();

    return (
        <section className="main_page">
            {token ? (
                <Paper elevation={3} className="main_statistics">
                    <Paper elevation={3} className="today">
                        <h3>Today</h3>
                        <div className="today_statistics">
                            <Paper elevation={3}>
                                <h5>Learned words</h5>
                                <p>4</p>
                            </Paper>
                            <Paper elevation={3}>
                                <h5>Sucessfull answers</h5>
                                <p>40%</p>
                            </Paper>
                            <Paper elevation={3}>
                                <h5>Best sequence</h5>
                                <p>10</p>
                            </Paper>
                        </div>
                    </Paper>
                    <Paper elevation={3} className="week">
                        <h3>Weekly progress</h3>
                        <div className="week_statistics">
                            <h4>Цель на сегодня</h4>
                            <p>Завершить 50 карточек</p>
                        </div>
                        <div className="allweek">
                            <div>
                                <CheckIcon />
                                <p>Mon</p>
                            </div>
                            <div>
                                <CheckIcon />
                                <p>Mon</p>
                            </div>
                            <div>
                                <CheckIcon />
                                <p>Mon</p>
                            </div>
                            <div>
                                <CheckIcon />
                                <p>Mon</p>
                            </div>
                            <div>
                                <CheckIcon />
                                <p>Mon</p>
                            </div>
                            <div>
                                <CheckIcon />
                                <p>Mon</p>
                            </div>
                            <div>
                                <CheckIcon />
                                <p>Mon</p>
                            </div>
                        </div>
                    </Paper>
                </Paper>
            ) : (
                <div>Sing in to track your statistics</div>
            )}
            <div className="links">
                {routes
                    .filter((i) => i.url !== '/')
                    .map((e) => {
                        return (
                            <Link to={e.url} key={`mpurl_${e.url}`}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={e.img}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {e.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        );
                    })}
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    statistics: statisticsSelectors.getStatistics(state),
    token: getToken(state),
});

MainPage.defaultProps = {
    token: null,
};

MainPage.propTypes = {
    token: PropTypes.string,
    routes: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default connect(mapStateToProps)(MainPage);
