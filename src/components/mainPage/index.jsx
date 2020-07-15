import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import { Link } from 'react-router-dom';

import statisticsSelectors from '../router/storage/getPutStatisticsRedux/statisticsSelectors';
import WeeklyAchivmentsWidget from '../statistics/components/WeeklyAchivmentsWidget';
import TodayAchivmentsWidget from '../statistics/components/TodayAchivmentsWidget';

const useStyles = makeStyles(() => ({
    media: {
        height: 150,
    },
}));

const MainPage = ({ routes }) => {
    const classes = useStyles();

    return (
        <section className="main_page">
            <div className="main_statistics">
                <TodayAchivmentsWidget />
                <WeeklyAchivmentsWidget />
            </div>
            <div className="links">
                {routes
                    .filter((i) => i.mainPage)
                    .map((e) => {
                        return (
                            <Link to={e.url} key={`mpurl_${e.url}`}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={e.img}
                                            title={e.title}
                                        />
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
});

MainPage.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            mainPage: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default connect(mapStateToProps)(MainPage);
