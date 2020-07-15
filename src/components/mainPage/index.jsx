import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import statisticsSelectors from '../router/storage/getPutStatisticsRedux/statisticsSelectors';

const useStyles = makeStyles({
    media: {
        height: 150,
    },
    root: {
        maxWidth: 350,
    },
});

const MainPage = ({ routes }) => {
    const classes = useStyles();

    return (
        <section className="main_page">
            {routes
                .filter((i) => i.url !== '/')
                .map((e) => {
                    return (
                        <Link to={e.url} key={`mpurl_${e.url}`}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={e.img}
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                            </Card>
                        </Link>
                    );
                })}
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
            exact: PropTypes.bool.isRequired,
            game: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default connect(mapStateToProps)(MainPage);
